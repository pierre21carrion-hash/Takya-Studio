'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { IVA_ECUADOR, type DetalleFactura } from '@/lib/types'

async function nextNumeroSecuencial(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { count } = await supabase
    .from('facturas')
    .select('*', { count: 'exact', head: true })
  const n = (count ?? 0) + 1
  return `FAC-${String(n).padStart(5, '0')}`
}

export async function getFacturas() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('facturas')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []) as import('@/lib/types').Factura[]
}

export async function crearFactura(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const ruc_cliente = formData.get('ruc_cliente') as string
  const razon_social = formData.get('razon_social') as string
  const direccion_cliente = formData.get('direccion_cliente') as string
  const metodo_pago = formData.get('metodo_pago') as string
  const retencion_iva_pct = parseFloat(formData.get('retencion_iva_pct') as string) || 0
  const retencion_ir_pct = parseFloat(formData.get('retencion_ir_pct') as string) || 0

  const detalleRaw = formData.get('detalle') as string
  let detalle: DetalleFactura[] = []
  try { detalle = JSON.parse(detalleRaw) } catch { return { error: 'Detalle inválido' } }
  if (detalle.length === 0) return { error: 'Agrega al menos un ítem' }

  if (!ruc_cliente || !razon_social) return { error: 'RUC y razón social son requeridos' }

  const subtotal = detalle.reduce((s, d) => s + d.subtotal, 0)
  const iva = subtotal * IVA_ECUADOR
  const total = subtotal + iva
  const retencion_iva = total * (retencion_iva_pct / 100)
  const retencion_ir = subtotal * (retencion_ir_pct / 100)
  const numero_secuencial = await nextNumeroSecuencial(supabase)

  const { error } = await supabase.from('facturas').insert({
    numero_secuencial,
    fecha_emision: new Date().toISOString().slice(0, 10),
    ruc_cliente, razon_social, direccion_cliente,
    detalle, subtotal, iva, total,
    retencion_iva, retencion_ir,
    estado: 'borrador',
    metodo_pago: metodo_pago || 'transferencia',
    created_by: user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard/facturacion')
  return { success: true }
}

export async function actualizarEstadoFactura(id: string, estado: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('facturas')
    .update({ estado })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard/facturacion')
  return { success: true }
}
