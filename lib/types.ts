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
  facturacion: 'Facturación', crm: 'CRM', activos: 'Activos Digitales',
  estimador: 'Estimador IA', rentabilidad: 'Rentabilidad',
}

// ─── Ecuador fiscal constants ──────────────────────────────────────────────────
export const IVA_ECUADOR = 0.15

// ─── New module types ──────────────────────────────────────────────────────────

export interface DetalleFactura {
  descripcion: string
  cantidad: number
  precio_unitario: number
  subtotal: number
}

export type EstadoFactura = 'borrador' | 'emitida' | 'pagada' | 'anulada'
export type MetodoPago = 'transferencia' | 'efectivo' | 'tarjeta' | 'stripe'

export interface Factura {
  id: string
  numero_secuencial: string
  fecha_emision: string
  ruc_cliente: string
  razon_social: string
  direccion_cliente: string
  detalle: DetalleFactura[]
  subtotal: number
  iva: number
  total: number
  retencion_iva: number
  retencion_ir: number
  estado: EstadoFactura
  metodo_pago: MetodoPago
  created_by: string | null
  created_at: string
}

export type EtapaLead = 'prospecto' | 'propuesta_enviada' | 'negociando' | 'ganado' | 'perdido'

export interface Lead {
  id: string
  nombre: string
  empresa: string
  whatsapp: string
  email: string
  plan_interes: string
  valor_estimado: number
  etapa: EtapaLead
  responsable_id: string | null
  responsable?: { nombre: string; color: string }
  fecha_ultimo_contacto: string
  notas: string
  created_at: string
}

export type TipoActivo = 'dominio' | 'hosting' | 'repo' | 'acceso' | 'otro'
export type EstadoActivo = 'activo' | 'por_renovar' | 'vencido'

export interface ActivoDigital {
  id: string
  cliente: string
  proyecto: string
  tipo: TipoActivo
  nombre: string
  url: string
  registrador: string
  fecha_vencimiento: string | null
  costo_anual: number
  estado: EstadoActivo
  notas_referencia: string
  created_by: string | null
  created_at: string
}

export type EtapaProyecto = 'descubrimiento' | 'diseño' | 'desarrollo' | 'revision' | 'publicado'

export interface ProyectoExtendido {
  id: string
  cliente: string
  plan: string
  estado: 'activo' | 'pausado' | 'completado' | 'cancelado'
  fecha_inicio: string
  fecha_entrega: string
  fecha_entrega_prometida: string | null
  fecha_entrega_real: string | null
  etapa_actual: EtapaProyecto
  porcentaje: number
  token_cliente: string
  notas_cliente: string
  valor: number
  responsable_id: string | null
  responsable?: { nombre: string; color: string }
  created_at: string
}

export interface Estimado {
  id: string
  cliente: string
  tipo_negocio: string
  respuestas: Record<string, unknown>
  resultado: Record<string, unknown> | null
  plan_recomendado: string
  precio_base: number
  tiempo_estimado: string
  created_by: string | null
  created_at: string
}

export const ETAPAS_PROYECTO: EtapaProyecto[] = [
  'descubrimiento', 'diseño', 'desarrollo', 'revision', 'publicado',
]

export const ETAPA_LABELS: Record<EtapaProyecto, string> = {
  descubrimiento: 'Descubrimiento',
  diseño: 'Diseño',
  desarrollo: 'Desarrollo',
  revision: 'Revisión',
  publicado: 'Publicado',
}

export const ETAPA_COLORES: Record<EtapaProyecto, string> = {
  descubrimiento: '#7C3AED',
  diseño: '#D97706',
  desarrollo: '#2563EB',
  revision: '#D4820A',
  publicado: '#059669',
}

export const ETAPAS_CRM: EtapaLead[] = [
  'prospecto', 'propuesta_enviada', 'negociando', 'ganado', 'perdido',
]

export const ETAPA_CRM_LABELS: Record<EtapaLead, string> = {
  prospecto: 'Prospecto',
  propuesta_enviada: 'Propuesta Enviada',
  negociando: 'Negociando',
  ganado: 'Ganado',
  perdido: 'Perdido',
}
