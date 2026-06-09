'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function crearVenta(formData: FormData) {
  const supabase = await createClient()

  const cliente = formData.get('cliente') as string
  const negocio = formData.get('negocio') as string
  const plan = formData.get('plan') as string
  const monto = parseFloat(formData.get('monto') as string)
  const estado = formData.get('estado') as string
  const origen = formData.get('origen') as string
  const fecha = formData.get('fecha') as string
  const responsable_id = formData.get('responsable_id') as string || null

  if (!cliente || !monto) return { error: 'Completa cliente y monto' }

  const { error } = await supabase.from('ventas').insert({
    cliente, negocio, plan, monto, estado, origen, fecha, responsable_id,
  })

  if (error) return { error: error.message }

  const mantenimiento = formData.get('mantenimiento') === 'on'
  if (mantenimiento) {
    await supabase.from('ventas').insert({
      cliente, negocio, plan: 'Mantenimiento', monto: 49,
      estado: 'pagado', origen: 'Recurrente',
      fecha: new Date().toISOString().slice(0, 10),
      responsable_id,
    })
  }

  revalidatePath('/dashboard/ventas')
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/contabilidad')
  return { success: true }
}

export async function getVentas() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('ventas')
    .select('*, responsable:users(nombre, color)')
    .order('fecha', { ascending: false })
  return data ?? []
}

export async function getVentasMes() {
  const mes = new Date().toISOString().slice(0, 7)
  const supabase = await createClient()
  const { data } = await supabase
    .from('ventas')
    .select('*')
    .gte('fecha', `${mes}-01`)
    .lt('fecha', `${mes}-32`)
  return data ?? []
}
