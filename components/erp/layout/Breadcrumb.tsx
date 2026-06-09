'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LABELS: Record<string, string> = {
  dashboard:     'Dashboard',
  equipo:        'Equipo',
  ventas:        'Ventas',
  contabilidad:  'Contabilidad',
  marketing:     'Marketing',
  proyectos:     'Proyectos',
  chat:          'Chat',
  cotizaciones:  'Cotizaciones',
  contratos:     'Contratos',
  calendario:    'Calendario',
  reportes:      'Reportes IA',
  notificaciones:'Notificaciones',
  inicio:        'Mi Panel',
  perfil:        'Mi Perfil',
}

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((seg, i) => ({
    label: LABELS[seg] ?? seg.replace(/-/g, ' '),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }))

  return (
    <nav
      className="flex items-center gap-1.5"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}
      aria-label="Breadcrumb"
    >
      <Link href="/dashboard" className="no-underline" style={{ color: 'rgba(255,255,255,.35)', transition: 'color .15s' }}>
        Nixo OS
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <span style={{ color: 'rgba(255,255,255,.20)' }}>/</span>
          {i === crumbs.length - 1 ? (
            <span style={{ color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="no-underline" style={{ color: 'rgba(255,255,255,.40)', transition: 'color .15s' }}>
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
