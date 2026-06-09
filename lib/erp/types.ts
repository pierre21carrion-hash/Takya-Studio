export type Role = 'ceo' | 'socio' | 'director' | 'diseñador' | 'desarrollador' | 'marketing' | 'asistente'

export interface UserProfile {
  id: string
  nombre: string
  email: string
  cargo: string
  rol: Role
  color: string
  created_at: string
}

export const ROLES: Record<Role, { label: string; color: string }> = {
  ceo:          { label: 'CEO',             color: '#1B2A4A' },
  socio:        { label: 'Socio',           color: '#2C6EDB' },
  director:     { label: 'Director',        color: '#6D3FCC' },
  diseñador:    { label: 'Diseñador',       color: '#D4820A' },
  desarrollador:{ label: 'Desarrollador',   color: '#059669' },
  marketing:    { label: 'Marketing',       color: '#0891B2' },
  asistente:    { label: 'Asistente',       color: '#7A6F68' },
}

export function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

export const SIDEBAR_NAV = [
  {
    section: 'Acción rápida',
    items: [
      { label: 'Registrar',     href: '/dashboard/registrar',       key: 'registrar' },
    ],
  },
  {
    section: 'Empresa',
    items: [
      { label: 'Dashboard',     href: '/dashboard',                 key: 'dashboard' },
      { label: 'Equipo',        href: '/dashboard/equipo',          key: 'equipo' },
      { label: 'Reportes',      href: '/dashboard/reportes',        key: 'reportes' },
      { label: 'Rentabilidad',  href: '/dashboard/rentabilidad',    key: 'rentabilidad' },
    ],
  },
  {
    section: 'Operaciones',
    items: [
      { label: 'Ventas',        href: '/dashboard/ventas',          key: 'ventas' },
      { label: 'CRM',           href: '/dashboard/crm',             key: 'crm' },
      { label: 'Facturación',   href: '/dashboard/facturacion',     key: 'facturacion' },
      { label: 'Contabilidad',  href: '/dashboard/contabilidad',    key: 'contabilidad' },
      { label: 'Marketing',     href: '/dashboard/marketing',       key: 'marketing' },
      { label: 'Proyectos',     href: '/dashboard/proyectos',       key: 'proyectos' },
      { label: 'Cotizaciones',  href: '/dashboard/cotizaciones',    key: 'cotizaciones' },
      { label: 'Contratos',     href: '/dashboard/contratos',       key: 'contratos' },
      { label: 'Activos',       href: '/dashboard/activos',         key: 'activos' },
    ],
  },
  {
    section: 'Herramientas',
    items: [
      { label: 'Estimador IA',  href: '/dashboard/estimador',       key: 'estimador' },
      { label: 'Calendario',    href: '/dashboard/calendario',      key: 'calendario' },
    ],
  },
  {
    section: 'Mi espacio',
    items: [
      { label: 'Chat',          href: '/dashboard/chat',            key: 'chat' },
      { label: 'Notificaciones',href: '/dashboard/notificaciones',  key: 'notificaciones' },
      { label: 'Perfil',        href: '/dashboard/perfil',          key: 'perfil' },
    ],
  },
]

export const PAGE_LABELS: Record<string, string> = {
  registrar:      'Registrar',
  dashboard:      'Dashboard Ejecutivo',
  equipo:         'Gestión de Equipo',
  reportes:       'Reportes IA',
  rentabilidad:   'Análisis de Rentabilidad',
  ventas:         'Ventas',
  crm:            'CRM · Pipeline',
  facturacion:    'Facturación SRI',
  contabilidad:   'Contabilidad',
  marketing:      'Marketing Digital',
  proyectos:      'Proyectos',
  cotizaciones:   'Cotizaciones',
  contratos:      'Contratos',
  activos:        'Activos Digitales',
  estimador:      'Estimador IA',
  calendario:     'Calendario',
  chat:           'Chat Interno',
  notificaciones: 'Notificaciones',
  perfil:         'Mi Perfil',
}
