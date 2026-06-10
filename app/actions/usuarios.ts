'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

async function assertCeo() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }
  const { data: profile } = await supabase.from('users').select('rol').eq('id', user.id).single()
  if (profile?.rol !== 'ceo') return { error: 'Solo el CEO puede gestionar el equipo' }
  return { ok: true }
}

export async function getUsers() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true })
  return data ?? []
}

export async function crearUsuario(data: {
  nombre: string
  email: string
  password: string
  cargo: string
  rol: string
  celular?: string
  color: string
}) {
  const check = await assertCeo()
  if ('error' in check) return check

  const admin = createAdminClient()

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  })
  if (authError) return { error: authError.message }

  const { error: profileError } = await admin.from('users').insert({
    id: authData.user.id,
    nombre: data.nombre,
    email: data.email,
    cargo: data.cargo,
    rol: data.rol,
    color: data.color,
  })
  if (profileError) return { error: profileError.message }

  // celular es opcional — si la columna no existe en el schema se ignora
  if (data.celular) {
    await admin.from('users').update({ celular: data.celular }).eq('id', authData.user.id)
  }

  revalidatePath('/dashboard/equipo')
  return { success: true }
}

export async function editarUsuario(userId: string, data: {
  nombre: string
  cargo: string
  rol: string
  color: string
  celular?: string
}) {
  const check = await assertCeo()
  if ('error' in check) return check

  const admin = createAdminClient()
  const { error } = await admin.from('users').update({
    nombre: data.nombre,
    cargo: data.cargo,
    rol: data.rol,
    color: data.color,
  }).eq('id', userId)

  if (error) return { error: error.message }

  // celular es opcional — si la columna no existe se ignora silenciosamente
  if (data.celular !== undefined) {
    await admin.from('users').update({ celular: data.celular }).eq('id', userId)
  }

  revalidatePath('/dashboard/equipo')
  return { success: true }
}

export async function eliminarUsuario(userId: string) {
  const check = await assertCeo()
  if ('error' in check) return check

  const admin = createAdminClient()
  const { error } = await admin.auth.admin.deleteUser(userId)
  if (error) return { error: error.message }

  revalidatePath('/dashboard/equipo')
  return { success: true }
}
