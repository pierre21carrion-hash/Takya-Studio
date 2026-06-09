'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getProyectos() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proyectos')
    .select('*, responsable:users(nombre, color)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function crearProyecto(formData: FormData) {
  const supabase = await createClient()

  const cliente = formData.get('cliente') as string
  const plan = formData.get('plan') as string
  const valor = parseFloat(formData.get('valor') as string) || 0
  const fecha_inicio = formData.get('fecha_inicio') as string
  const fecha_entrega = formData.get('fecha_entrega') as string
  const responsable_id = formData.get('responsable_id') as string || null

  if (!cliente) return { error: 'El nombre del cliente es requerido' }

  const { error } = await supabase.from('proyectos').insert({
    cliente, plan, valor, fecha_inicio, fecha_entrega,
    responsable_id, estado: 'activo', progreso: 0,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/proyectos')
  return { success: true }
}

export async function actualizarProgresoProyecto(id: string, progreso: number) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('proyectos')
    .update({ progreso })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/proyectos')
  return { success: true }
}

export async function getTareas(proyectoId?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('tareas')
    .select('*, proyecto:proyectos(cliente, plan), asignado:users(nombre, color)')
    .order('created_at', { ascending: true })

  if (proyectoId) query = query.eq('proyecto_id', proyectoId)

  const { data } = await query
  return data ?? []
}

export async function crearTarea(formData: FormData) {
  const supabase = await createClient()

  const proyecto_id = formData.get('proyecto_id') as string
  const titulo = formData.get('titulo') as string
  const descripcion = formData.get('descripcion') as string || ''
  const asignado_a = formData.get('asignado_a') as string || null
  const fecha_vencimiento = formData.get('fecha_vencimiento') as string || null

  if (!titulo) return { error: 'El título es requerido' }

  const { error } = await supabase.from('tareas').insert({
    proyecto_id, titulo, descripcion, asignado_a, fecha_vencimiento,
    estado: 'por_hacer',
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/proyectos')
  revalidatePath('/dashboard/inicio')
  return { success: true }
}

export async function actualizarEstadoTarea(id: string, estado: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tareas')
    .update({ estado })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard/proyectos')
  revalidatePath('/dashboard/inicio')
  return { success: true }
}

export async function getMisTareas(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tareas')
    .select('*, proyecto:proyectos(cliente, plan)')
    .eq('asignado_a', userId)
    .order('fecha_vencimiento', { ascending: true })
  return data ?? []
}
