'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

const TABLAS_DATOS = [
  'ventas',
  'gastos',
  'proyectos',
  'tareas',
  'cotizaciones',
  'contratos',
  'notificaciones',
  'horas',
] as const

export async function resetAllData(): Promise<{ error?: string; deleted?: Record<string, number> }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: profile } = await supabase
    .from('users')
    .select('rol')
    .eq('id', user.id)
    .single()

  if (profile?.rol !== 'ceo') return { error: 'Solo el CEO puede reiniciar los datos' }

  const deleted: Record<string, number> = {}

  for (const tabla of TABLAS_DATOS) {
    const { data, error } = await supabase
      .from(tabla)
      .delete()
      .not('id', 'is', null)
      .select('id')

    if (error) {
      if (!error.message.includes('does not exist')) {
        console.error(`Error en ${tabla}:`, error.message)
      }
    } else {
      deleted[tabla] = data?.length ?? 0
    }
  }

  const rutas = ['/dashboard', '/dashboard/ventas', '/dashboard/contabilidad', '/dashboard/marketing', '/dashboard/proyectos', '/dashboard/cotizaciones', '/dashboard/contratos', '/dashboard/reportes']
  rutas.forEach((r) => revalidatePath(r))

  return { deleted }
}
