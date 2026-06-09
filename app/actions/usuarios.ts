'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getUsers() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true })
  return data ?? []
}

export async function crearUsuario(formData: FormData) {
  const supabase = await createClient()

  const nombre = formData.get('nombre') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const cargo = formData.get('cargo') as string
  const rol = formData.get('rol') as string
  const salario = parseFloat(formData.get('salario') as string) || 0
  const horas_meta = parseInt(formData.get('horas_meta') as string) || 40
  const color = formData.get('color') as string

  if (!nombre || !email || !password) return { error: 'Completa nombre, email y contraseña' }

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) return { error: authError.message }

  const { error: profileError } = await supabase.from('users').insert({
    id: authData.user.id,
    nombre, email, cargo, rol, salario, horas_meta, color,
  })

  if (profileError) return { error: profileError.message }

  revalidatePath('/dashboard/equipo')
  return { success: true }
}

export async function eliminarUsuario(userId: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) return { error: error.message }

  revalidatePath('/dashboard/equipo')
  return { success: true }
}
