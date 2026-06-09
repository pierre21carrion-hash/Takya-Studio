'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { PAGE_LABELS, initials, type UserProfile } from '@/lib/erp/types'
import { MobileDrawer } from './MobileDrawer'

interface TopNavProps {
  user: UserProfile
  unreadCount?: number
}

export function TopNav({ user, unreadCount = 0 }: TopNavProps) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const segment = pathname.split('/')[2] ?? 'dashboard'
  const pageLabel = PAGE_LABELS[segment] ?? 'Takya OS'

  return (
    <>
      <nav
        className="flex items-center flex-shrink-0 gap-4"
        style={{
          height: 56,
          background: '#1B2A4A',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        {/* Mobile: burger + logo */}
        <div className="md:hidden flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.8)' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4h11M2 7.5h11M2 11h11"/>
            </svg>
          </button>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: '#00C27A' }}>
            T
          </div>
        </div>

        {/* Desktop: breadcrumb */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'rgba(255,255,255,.35)' }}>
            Takya OS
          </span>
          <span style={{ color: 'rgba(255,255,255,.18)', fontSize: 14 }}>/</span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'rgba(255,255,255,.70)' }}>
            {pageLabel}
          </span>
        </div>

        <div className="flex-1" />

        {/* Right: bell + status + avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/dashboard/notificaciones" className="relative no-underline">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 34, height: 34, background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.55)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8 1a5.5 5.5 0 0 1 5.5 5.5v3.5l1 1.5H1.5L2.5 10V6.5A5.5 5.5 0 0 1 8 1z"/>
                <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
              </svg>
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ width: 16, height: 16, background: '#C5302A', fontSize: '9px', fontFamily: 'var(--font-geist-mono)' }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
          </Link>

          <div
            className="hidden md:flex items-center gap-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,.06)', padding: '6px 12px' }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C27A', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, color: 'rgba(255,255,255,.55)' }}>
              Sistema vivo
            </span>
          </div>

          <Link href="/dashboard/perfil" className="no-underline hidden md:block">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: `${user.color}33`, color: user.color, border: `1px solid ${user.color}44` }}
            >
              {initials(user.nombre)}
            </div>
          </Link>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} unreadCount={unreadCount} />
    </>
  )
}
