'use server'

import { createClient } from '@/lib/supabase/server'

export async function getRentabilidadData() {
  const supabase = await createClient()

  const [
    { data: proyectos },
    { data: ventas },
    { data: gastos },
    { data: horas },
    { data: users },
  ] = await Promise.all([
    supabase.from('proyectos').select('*').order('created_at', { ascending: false }),
    supabase.from('ventas').select('*').order('fecha', { ascending: false }),
    supabase.from('gastos').select('*').order('fecha', { ascending: false }),
    supabase.from('horas').select('*'),
    supabase.from('users').select('id, nombre, salario'),
  ])

  return {
    proyectos: proyectos ?? [],
    ventas: ventas ?? [],
    gastos: gastos ?? [],
    horas: horas ?? [],
    users: users ?? [],
  }
}

export async function getEstimados() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('estimados')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)
  return (data ?? []) as import('@/lib/types').Estimado[]
}

export async function guardarEstimado(data: {
  cliente: string
  tipo_negocio: string
  respuestas: Record<string, unknown>
  resultado: Record<string, unknown>
  plan_recomendado: string
  precio_base: number
  tiempo_estimado: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase.from('estimados').insert({ ...data, created_by: user?.id })
  if (error) return { error: error.message }
  return { success: true }
}
