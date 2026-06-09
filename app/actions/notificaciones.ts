'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getNotificaciones() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('notificaciones')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)
  return data ?? []
}

export async function marcarLeida(id: string) {
  const supabase = await createClient()
  await supabase.from('notificaciones').update({ leida: true }).eq('id', id)
  revalidatePath('/dashboard/notificaciones')
}

export async function marcarTodasLeidas() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('notificaciones')
    .update({ leida: true })
    .eq('user_id', user.id)

  revalidatePath('/dashboard/notificaciones')
}

export async function crearNotificacion({
  userId, titulo, cuerpo, tipo = 'info',
}: {
  userId: string
  titulo: string
  cuerpo: string
  tipo?: string
}) {
  const supabase = await createClient()
  await supabase.from('notificaciones').insert({
    user_id: userId, titulo, cuerpo, tipo, leida: false,
  })
}
