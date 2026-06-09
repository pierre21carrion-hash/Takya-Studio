'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function crearGasto(formData: FormData) {
  const supabase = await createClient()

  const descripcion = formData.get('descripcion') as string
  const monto = parseFloat(formData.get('monto') as string)
  const categoria = formData.get('categoria') as string
  const proveedor = (formData.get('proveedor') as string) || ''
  const recurrente = formData.get('recurrente') === 'on'

  if (!descripcion || !monto) return { error: 'Completa descripción y monto' }

  const { error } = await supabase.from('gastos').insert({
    descripcion, monto, categoria, proveedor, recurrente,
    fecha: new Date().toISOString().slice(0, 10),
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/contabilidad')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function getGastos() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('gastos')
    .select('*')
    .order('fecha', { ascending: false })
  return data ?? []
}
