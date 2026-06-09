'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_NAV, initials, type UserProfile } from '@/lib/erp/types'
import { logout } from '@/app/dashboard/actions'

const ICONS: Record<string, React.ReactNode> = {
  registrar: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L4 9h5l-2 6 7-8H9l2-6z"/>
    </svg>
  ),
  dashboard: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="6" height="6" rx="1.3"/><rect x="9" y="1" width="6" height="6" rx="1.3"/>
      <rect x="1" y="9" width="6" height="6" rx="1.3"/><rect x="9" y="9" width="6" height="6" rx="1.3"/>
    </svg>
  ),
  equipo: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5.5" cy="4.5" r="2.8"/><path d="M1 14c0-2.5 2-4.5 4.5-4.5S10 11.5 10 14"/>
      <path d="M11 2.5c1.1 0 2 .9 2 2s-.9 2-2 2"/><path d="M15 14c0-2-1.4-3.7-3-4.4"/>
    </svg>
  ),
  reportes: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,12 5,7.5 8.5,9.5 14,3"/><path d="M11 3h3v3"/>
    </svg>
  ),
  ventas: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,12 5.5,6.5 9,8.5 14,2.5"/><path d="M11 2.5h3v3"/>
    </svg>
  ),
  contabilidad: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="1" width="12" height="14" rx="1.5"/><path d="M5 5.5h6M5 8h6M5 10.5h4"/>
    </svg>
  ),
  marketing: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2.5L3.5 6H2a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1H3.5L13 13V2.5z"/>
      <path d="M4 8.5v4"/>
    </svg>
  ),
  proyectos: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1" y="1" width="3.5" height="14" rx="1"/><rect x="6.5" y="1" width="3.5" height="9" rx="1"/>
      <rect x="6.5" y="12" width="3.5" height="3" rx="1"/><rect x="12" y="1" width="3" height="5" rx="1"/>
      <rect x="12" y="8" width="3" height="7" rx="1"/>
    </svg>
  ),
  cotizaciones: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="1" width="12" height="14" rx="1.5"/><path d="M8 4v8"/>
      <path d="M6 5.5a2 2 0 0 1 4 0c0 1.5-4 2-4 3.5a2 2 0 0 0 4 0"/>
    </svg>
  ),
  contratos: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="1" width="12" height="14" rx="1.5"/>
      <path d="M5 5.5h6M5 8h5M5 10.5h3"/><path d="M9.5 10.5l1.5 1.5L14 9"/>
    </svg>
  ),
  chat: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M14 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4l2 3 2-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
    </svg>
  ),
  calendario: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1" y="2.5" width="14" height="12.5" rx="1.5"/>
      <path d="M1 6.5h14M5 1v3M11 1v3"/>
    </svg>
  ),
  notificaciones: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 1a5.5 5.5 0 0 1 5.5 5.5v3.5l1 1.5H1.5L2.5 10V6.5A5.5 5.5 0 0 1 8 1z"/>
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
    </svg>
  ),
  perfil: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="5" r="3.5"/><path d="M1 15c0-3.5 3-6 7-6s7 2.5 7 6"/>
    </svg>
  ),
  facturacion: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="1" width="12" height="14" rx="1.5"/>
      <path d="M5 5h6M5 7.5h4M8.5 10.5h2.5M5 10.5h2"/>
    </svg>
  ),
  crm: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1" y="3" width="3" height="10" rx="1"/><rect x="6.5" y="3" width="3" height="7" rx="1"/>
      <rect x="12" y="3" width="3" height="5" rx="1"/>
      <path d="M4 8h2.5M9.5 6.5H12"/>
    </svg>
  ),
  activos: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5"/><path d="M8 4v4l2.5 2.5"/>
    </svg>
  ),
  estimador: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M10 2l2 6h2L10 14l-6-6h2z"/>
    </svg>
  ),
  rentabilidad: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,13 5,8 9,10 14,3"/><path d="M11 3h3v3"/>
      <path d="M1 15h14" strokeWidth="1"/>
    </svg>
  ),
}

interface SidebarProps {
  user: UserProfile
  unreadCount?: number
}

export function Sidebar({ user, unreadCount = 0 }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(href)

  return (
    <aside
      className="hidden md:flex flex-col flex-shrink-0 h-full overflow-y-auto"
      style={{
        width: 220,
        background: '#1B2A4A',
        borderRight: '1px solid rgba(255,255,255,.07)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
          style={{ background: '#00C27A' }}
        >
          T
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 13, fontWeight: 700, color: '#fff' }}>
            Takya OS
          </div>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'rgba(255,255,255,.35)', letterSpacing: '0.08em' }}>
            Sistema interno
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {SIDEBAR_NAV.map((group) => (
          <div key={group.section} className="mb-5">
            <div
              className="px-3 mb-1.5"
              style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,.25)' }}
            >
              {group.section}
            </div>
            {group.items.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 mb-0.5 no-underline transition-all duration-150"
                  style={{
                    background: active ? 'rgba(0,194,122,.15)' : 'transparent',
                    color: active ? '#00C27A' : 'rgba(255,255,255,.55)',
                  }}
                >
                  <span className="flex-shrink-0" style={{ opacity: active ? 1 : 0.7 }}>
                    {ICONS[item.key] ?? ICONS.dashboard}
                  </span>
                  <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 13, fontWeight: active ? 600 : 400 }}>
                    {item.label}
                  </span>
                  {item.key === 'notificaciones' && unreadCount > 0 && (
                    <span
                      className="ml-auto rounded-full flex items-center justify-center text-white"
                      style={{ width: 16, height: 16, background: '#C5302A', fontSize: '9px', fontFamily: 'var(--font-geist-mono)', fontWeight: 700 }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 mb-1" style={{ background: 'rgba(255,255,255,.05)' }}>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: `${user.color}22`, color: user.color }}
          >
            {initials(user.nombre)}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 12, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.nombre}
            </div>
            <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'rgba(255,255,255,.35)' }}>
              {user.cargo}
            </div>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,.35)', fontFamily: 'var(--font-geist-sans)', fontSize: 12 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M11 11l3-3-3-3M14 8H6"/>
            </svg>
            Salir → web pública
          </button>
        </form>
      </div>
    </aside>
  )
}
