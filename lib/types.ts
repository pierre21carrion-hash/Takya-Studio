export type Role =
  | 'ceo'
  | 'developer'
  | 'designer'
  | 'marketing'
  | 'contabilidad'
  | 'ventas'
  | 'freelancer'

export interface UserProfile {
  id: string
  nombre: string
  email: string
  cargo: string
  rol: Role
  salario: number
  horas_meta: number
  color: string
  created_at: string
}

export interface Venta {
  id: string
  fecha: string
  cliente: string
  negocio: string
  plan: string
  monto: number
  estado: 'pagado' | 'anticipo' | 'pendiente'
  origen: string
  responsable_id: string | null
  responsable?: UserProfile
  created_at: string
}

export interface Gasto {
  id: string
  fecha: string
  descripcion: string
  categoria: string
  monto: number
  proveedor: string
  recurrente: boolean
  created_at: string
}

export const usd = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-US')

export const usd2 = (n: number) =>
  '$' + n.toFixed(2)

export const initials = (name: string) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

export const fmt = (d: string | null) =>
  d ? d.split('-').reverse().join('/') : '—'

export const curMonth = () => new Date().toISOString().slice(0, 7)

export const monthKey = (d: string) => d?.slice(0, 7) ?? ''

export const ROLES: Record<Role, { label: string; color: string; pages: string[] }> = {
  ceo:          { label: 'CEO',          color: '#00d084', pages: ['inicio', 'equipo', 'ventas', 'contabilidad', 'marketing', 'proyectos', 'chat', 'cotizaciones', 'contratos', 'calendario', 'reportes', 'notificaciones', 'perfil'] },
  developer:    { label: 'Desarrollador', color: '#4f8eff', pages: ['inicio', 'proyectos', 'chat', 'calendario', 'notificaciones', 'perfil'] },
  designer:     { label: 'Diseñador',    color: '#a855f7', pages: ['inicio', 'proyectos', 'chat', 'calendario', 'notificaciones', 'perfil'] },
  marketing:    { label: 'Marketing',    color: '#f59e0b', pages: ['inicio', 'marketing', 'chat', 'calendario', 'notificaciones', 'perfil'] },
  contabilidad: { label: 'Contabilidad', color: '#06b6d4', pages: ['inicio', 'contabilidad', 'cotizaciones', 'chat', 'notificaciones', 'perfil'] },
  ventas:       { label: 'Ventas',       color: '#ef4444', pages: ['inicio', 'ventas', 'cotizaciones', 'chat', 'calendario', 'notificaciones', 'perfil'] },
  freelancer:   { label: 'Freelancer',   color: '#78716c', pages: ['inicio', 'chat', 'notificaciones', 'perfil'] },
}

export const SIDEBAR_NAV = [
  { id: 'equipo',         icon: '◐', label: 'Equipo',         section: 'empresa',     roles: ['ceo'] as Role[] },
  { id: 'reportes',       icon: '◈', label: 'Reportes IA',    section: 'empresa',     roles: ['ceo'] as Role[] },
  { id: 'ventas',         icon: '◎', label: 'Ventas',         section: 'operaciones', roles: ['ceo', 'ventas'] as Role[] },
  { id: 'contabilidad',   icon: '⊟', label: 'Contabilidad',   section: 'operaciones', roles: ['ceo', 'contabilidad'] as Role[] },
  { id: 'marketing',      icon: '◑', label: 'Marketing',      section: 'operaciones', roles: ['ceo', 'marketing'] as Role[] },
  { id: 'proyectos',      icon: '▦', label: 'Proyectos',      section: 'operaciones', roles: ['ceo', 'developer', 'designer', 'ventas'] as Role[] },
  { id: 'cotizaciones',   icon: '◧', label: 'Cotizaciones',   section: 'operaciones', roles: ['ceo', 'ventas', 'contabilidad'] as Role[] },
  { id: 'contratos',      icon: '▣', label: 'Contratos',      section: 'operaciones', roles: ['ceo', 'ventas'] as Role[] },
  { id: 'inicio',         icon: '⬡', label: 'Mi Panel',       section: 'yo',          roles: ['developer', 'designer', 'marketing', 'contabilidad', 'ventas', 'freelancer'] as Role[] },
  { id: 'perfil',         icon: '◔', label: 'Mi Perfil',      section: 'yo',          roles: ['ceo', 'developer', 'designer', 'marketing', 'contabilidad', 'ventas', 'freelancer'] as Role[] },
  { id: 'chat',           icon: '◫', label: 'Chat',           section: 'comun',       roles: ['ceo', 'developer', 'designer', 'marketing', 'contabilidad', 'ventas', 'freelancer'] as Role[] },
  { id: 'calendario',     icon: '◰', label: 'Calendario',     section: 'comun',       roles: ['ceo', 'developer', 'designer', 'marketing', 'ventas', 'freelancer'] as Role[] },
  { id: 'notificaciones', icon: '◱', label: 'Notificaciones', section: 'comun',       roles: ['ceo', 'developer', 'designer', 'marketing', 'contabilidad', 'ventas', 'freelancer'] as Role[] },
]

export const PAGE_LABELS: Record<string, string> = {
  inicio: 'Mi Panel', equipo: 'Equipo', ventas: 'Ventas', contabilidad: 'Contabilidad',
  marketing: 'Marketing', proyectos: 'Proyectos', chat: 'Chat', cotizaciones: 'Cotizaciones',
  contratos: 'Contratos', calendario: 'Calendario', reportes: 'Reportes IA',
  notificaciones: 'Notificaciones', perfil: 'Mi Perfil', dashboard: 'Dashboard',
}
