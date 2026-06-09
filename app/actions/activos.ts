'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getActivos() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('activos_digitales')
    .select('*')
    .order('fecha_vencimiento', { ascending: true })
  return (data ?? []) as import('@/lib/types').ActivoDigital[]
}

export async function getActivosProximosVencer() {
  const supabase = await createClient()
  const en30Dias = new Date()
  en30Dias.setDate(en30Dias.getDate() + 30)
  const { data } = await supabase
    .from('activos_digitales')
    .select('*')
    .lte('fecha_vencimiento', en30Dias.toISOString().slice(0, 10))
    .gte('fecha_vencimiento', new Date().toISOString().slice(0, 10))
    .order('fecha_vencimiento', { ascending: true })
  return (data ?? []) as import('@/lib/types').ActivoDigital[]
}

export async function crearActivo(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const cliente = formData.get('cliente') as string
  const proyecto = formData.get('proyecto') as string
  const tipo = formData.get('tipo') as string
  const nombre = formData.get('nombre') as string
  const url = formData.get('url') as string
  const registrador = formData.get('registrador') as string
  const fecha_vencimiento = (formData.get('fecha_vencimiento') as string) || null
  const costo_anual = parseFloat(formData.get('costo_anual') as string) || 0
  const notas_referencia = formData.get('notas_referencia') as string

  if (!cliente || !nombre || !tipo) return { error: 'Cliente, nombre y tipo son requeridos' }

  const { error } = await supabase.from('activos_digitales').insert({
    cliente, proyecto, tipo, nombre, url, registrador,
    fecha_vencimiento, costo_anual, notas_referencia,
    estado: 'activo',
    created_by: user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard/activos')
  return { success: true }
}

export async function actualizarEstadoActivo(id: string, estado: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('activos_digitales')
    .update({ estado })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard/activos')
  return { success: true }
}

export async function eliminarActivo(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('activos_digitales').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard/activos')
  return { success: true }
}
