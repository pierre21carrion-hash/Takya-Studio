'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BOTTOM_ITEMS = [
  {
    label: 'Inicio',
    href: '/dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 1.5L2 5.5v9h4.5V10h3v4.5H14v-9L8 1.5z"/>
      </svg>
    ),
  },
  {
    label: 'Ventas',
    href: '/dashboard/ventas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1,12 5.5,6.5 9,8.5 14,2.5"/><path d="M11 2.5h3v3"/>
      </svg>
    ),
  },
  {
    label: 'Chat',
    href: '/dashboard/chat',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4l2 3 2-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
      </svg>
    ),
  },
  {
    label: 'Proyectos',
    href: '/dashboard/proyectos',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="1" y="1" width="3.5" height="14" rx="1"/><rect x="6.5" y="1" width="3.5" height="9" rx="1"/>
        <rect x="6.5" y="12" width="3.5" height="3" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Perfil',
    href: '/dashboard/perfil',
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="8" cy="5" r="3.5"/><path d="M1 15c0-3.5 3-6 7-6s7 2.5 7 6"/>
      </svg>
    ),
  },
]

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex"
      style={{
        background: '#1B2A4A',
        borderTop: '1px solid rgba(255,255,255,.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {BOTTOM_ITEMS.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 no-underline transition-colors"
            style={{ color: active ? '#00C27A' : 'rgba(255,255,255,.4)' }}
          >
            {item.icon}
            <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '10px', fontWeight: active ? 600 : 400 }}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
