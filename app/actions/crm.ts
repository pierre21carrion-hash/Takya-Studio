'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { EtapaLead } from '@/lib/types'

export async function getLeads() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('leads')
    .select('*, responsable:users(nombre, color)')
    .order('created_at', { ascending: false })
  return (data ?? []) as import('@/lib/types').Lead[]
}

export async function crearLead(formData: FormData) {
  const supabase = await createClient()

  const nombre = formData.get('nombre') as string
  const empresa = formData.get('empresa') as string
  const whatsapp = formData.get('whatsapp') as string
  const email = formData.get('email') as string
  const plan_interes = formData.get('plan_interes') as string
  const valor_estimado = parseFloat(formData.get('valor_estimado') as string) || 0
  const responsable_id = (formData.get('responsable_id') as string) || null
  const notas = formData.get('notas') as string

  if (!nombre) return { error: 'El nombre es requerido' }

  const { error } = await supabase.from('leads').insert({
    nombre, empresa, whatsapp, email, plan_interes,
    valor_estimado, responsable_id, notas,
    etapa: 'prospecto',
    fecha_ultimo_contacto: new Date().toISOString().slice(0, 10),
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard/crm')
  return { success: true }
}

export async function moverLead(id: string, etapa: EtapaLead) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('leads')
    .update({ etapa, fecha_ultimo_contacto: new Date().toISOString().slice(0, 10) })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard/crm')
  return { success: true }
}

export async function actualizarLead(id: string, data: Partial<import('@/lib/types').Lead>) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').update(data).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard/crm')
  return { success: true }
}

export async function eliminarLead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard/crm')
  return { success: true }
}
