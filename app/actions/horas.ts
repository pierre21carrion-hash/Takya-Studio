'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function registrarHoras(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const horas = parseFloat(formData.get('horas') as string)
  const descripcion = formData.get('descripcion') as string || 'Trabajo general'
  const fecha = formData.get('fecha') as string || new Date().toISOString().slice(0, 10)

  if (!horas || horas <= 0) return { error: 'Ingresa las horas trabajadas' }

  const { error } = await supabase.from('horas').insert({
    user_id: user.id, horas, descripcion, fecha,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/inicio')
  return { success: true }
}

export async function getMisHoras() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('horas')
    .select('*')
    .eq('user_id', user.id)
    .order('fecha', { ascending: false })
  return data ?? []
}

export async function getAllHoras() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('horas')
    .select('*')
    .order('fecha', { ascending: false })
  return data ?? []
}

export async function getHorasByUser(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('horas')
    .select('*')
    .eq('user_id', userId)
    .order('fecha', { ascending: false })
  return data ?? []
}
