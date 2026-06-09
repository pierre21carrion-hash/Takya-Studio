'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface RegistroItem {
  id: string
  tipo: 'venta' | 'gasto' | 'nota'
  label: string
  monto?: number
  estado?: string
  hora: string
  created_at: string
}

export interface ResumenSemana {
  ventas: number
  gastos: number
  neto: number
}

export interface AlertaPendiente {
  count: number
}

export interface ClienteSugerencia {
  cliente: string
  ultimoServicio: string
  ultimoMonto: number
}

export interface UltimoGasto {
  descripcion: string
  categoria: string
  monto: number
  proveedor: string
}

export async function createVentaRapida(data: {
  cliente: string
  descripcion: string
  monto: number
  fecha: string
  estado: 'pagado' | 'pendiente'
  metodo_pago: string
}) {
  const supabase = await createClient()
  const { data: row, error } = await supabase
    .from('ventas')
    .insert({
      cliente: data.cliente,
      negocio: data.descripcion,
      plan: '',
      monto: data.monto,
      estado: data.estado,
      origen: data.metodo_pago,
      fecha: data.fecha,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }
  revalidatePath('/dashboard/registrar')
  revalidatePath('/dashboard/ventas')
  revalidatePath('/dashboard/contabilidad')
  revalidatePath('/dashboard')
  return { id: row.id as string }
}

export async function createGastoRapido(data: {
  concepto: string
  categoria: string
  monto: number
  fecha: string
  proveedor?: string
}) {
  const supabase = await createClient()
  const { data: row, error } = await supabase
    .from('gastos')
    .insert({
      descripcion: data.concepto,
      monto: data.monto,
      categoria: data.categoria,
      proveedor: data.proveedor ?? '',
      recurrente: false,
      fecha: data.fecha,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }
  revalidatePath('/dashboard/registrar')
  revalidatePath('/dashboard/contabilidad')
  revalidatePath('/dashboard')
  return { id: row.id as string }
}

export async function createNotaRapida(data: { texto: string; fecha: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: row, error } = await supabase
    .from('notas_rapidas')
    .insert({ texto: data.texto, fecha: data.fecha, created_by: user?.id })
    .select('id')
    .single()

  if (error) return { error: error.message }
  revalidatePath('/dashboard/registrar')
  return { id: row.id as string }
}

export async function undoRegistro(id: string, tipo: 'venta' | 'gasto' | 'nota') {
  const supabase = await createClient()
  const table = tipo === 'venta' ? 'ventas' : tipo === 'gasto' ? 'gastos' : 'notas_rapidas'
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)
    .gte('created_at', new Date(Date.now() - 10_000).toISOString())

  if (error) return { error: error.message }
  revalidatePath('/dashboard/registrar')
  revalidatePath('/dashboard/ventas')
  revalidatePath('/dashboard/contabilidad')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function getRegistrosHoy(): Promise<{ items: RegistroItem[]; balanceDia: number }> {
  const supabase = await createClient()
  const today = new Date().toISOString().slice(0, 10)

  const [{ data: ventas }, { data: gastos }, { data: notas }] = await Promise.all([
    supabase.from('ventas').select('id, cliente, negocio, monto, estado, created_at').eq('fecha', today).order('created_at', { ascending: false }),
    supabase.from('gastos').select('id, descripcion, categoria, monto, created_at').eq('fecha', today).order('created_at', { ascending: false }),
    supabase.from('notas_rapidas').select('id, texto, created_at').eq('fecha', today).order('created_at', { ascending: false }),
  ])

  const fmt = (ts: string) => new Date(ts).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })

  const items: RegistroItem[] = [
    ...(ventas ?? []).map(v => ({
      id: v.id, tipo: 'venta' as const,
      label: [v.negocio, v.cliente].filter(Boolean).join(' · '),
      monto: v.monto, estado: v.estado,
      hora: fmt(v.created_at), created_at: v.created_at,
    })),
    ...(gastos ?? []).map(g => ({
      id: g.id, tipo: 'gasto' as const,
      label: [g.descripcion, g.categoria].filter(Boolean).join(' · '),
      monto: g.monto,
      hora: fmt(g.created_at), created_at: g.created_at,
    })),
    ...(notas ?? []).map(n => ({
      id: n.id, tipo: 'nota' as const, label: n.texto,
      hora: fmt(n.created_at), created_at: n.created_at,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const balanceDia =
    (ventas ?? []).filter(v => v.estado === 'pagado').reduce((s, v) => s + v.monto, 0) -
    (gastos ?? []).reduce((s, g) => s + g.monto, 0)

  return { items, balanceDia }
}

export async function getResumenSemana(): Promise<ResumenSemana> {
  const supabase = await createClient()
  const now = new Date()
  const dow = now.getDay()
  const diffToMonday = dow === 0 ? -6 : 1 - dow
  const monday = new Date(now)
  monday.setDate(now.getDate() + diffToMonday)
  const mondayStr = monday.toISOString().slice(0, 10)
  const todayStr = now.toISOString().slice(0, 10)

  const [{ data: ventas }, { data: gastos }] = await Promise.all([
    supabase.from('ventas').select('monto, estado').gte('fecha', mondayStr).lte('fecha', todayStr),
    supabase.from('gastos').select('monto').gte('fecha', mondayStr).lte('fecha', todayStr),
  ])

  const totalVentas = (ventas ?? []).filter(v => v.estado === 'pagado').reduce((s, v) => s + v.monto, 0)
  const totalGastos = (gastos ?? []).reduce((s, g) => s + g.monto, 0)
  return { ventas: totalVentas, gastos: totalGastos, neto: totalVentas - totalGastos }
}

export async function getAlertasPendientes(): Promise<AlertaPendiente | null> {
  const supabase = await createClient()
  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const { count } = await supabase
    .from('ventas')
    .select('id', { count: 'exact', head: true })
    .eq('estado', 'pendiente')
    .lt('fecha', fiveDaysAgo)

  if (!count) return null
  return { count }
}

export async function getUltimoGasto(): Promise<UltimoGasto | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('gastos')
    .select('descripcion, categoria, monto, proveedor')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return data ?? null
}

export async function getClientesConHistorial(query: string): Promise<ClienteSugerencia[]> {
  if (query.length < 2) return []
  const supabase = await createClient()
  const { data } = await supabase
    .from('ventas')
    .select('cliente, negocio, monto, fecha')
    .ilike('cliente', `%${query}%`)
    .order('fecha', { ascending: false })
    .limit(20)

  if (!data) return []
  const map = new Map<string, ClienteSugerencia>()
  data.forEach(v => {
    if (!map.has(v.cliente)) {
      map.set(v.cliente, { cliente: v.cliente, ultimoServicio: v.negocio ?? '', ultimoMonto: v.monto })
    }
  })
  return Array.from(map.values()).slice(0, 5)
}
