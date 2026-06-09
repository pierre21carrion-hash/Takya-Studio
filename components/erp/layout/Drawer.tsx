'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_NAV, ROLES, initials, type Role, type UserProfile } from '@/lib/types'
import { logout } from '@/app/actions/auth'
import { useEffect } from 'react'

const SEC_LABELS: Record<string, string> = {
  empresa:     'Empresa',
  operaciones: 'Operaciones',
  yo:          'Mi espacio',
  comun:       'General',
}

interface DrawerProps {
  open: boolean
  onClose: () => void
  user: UserProfile
  unreadCount?: number
}

export function Drawer({ open, onClose, user, unreadCount = 0 }: DrawerProps) {
  const pathname = usePathname()
  const role = user.rol as Role
  const r = ROLES[role]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const items = SIDEBAR_NAV.filter((i) => i.roles.includes(role))
  const sections: Record<string, typeof items> = {}
  for (const item of items) {
    if (!sections[item.section]) sections[item.section] = []
    sections[item.section].push(item)
  }

  const isActive = (id: string) =>
    pathname === `/dashboard/${id}` || pathname.startsWith(`/dashboard/${id}/`)

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-250 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(28,23,20,.55)', backdropFilter: 'blur(3px)' }}
        onClick={onClose}
      />
      <div
        className={`fixed left-0 top-0 bottom-0 w-[260px] z-[80] flex flex-col overflow-hidden transition-transform duration-300 md:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--navy)', borderRight: '1px solid var(--nav-border)' }}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--nav-border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: 'var(--g)' }}>N</div>
            <span className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-head)' }}>Nixo OS</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-sm cursor-pointer"
            style={{ background: 'rgba(255,255,255,.08)', color: 'var(--nav-text)' }}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {Object.entries(sections).map(([sec, secItems]) => (
            <div key={sec} className="mb-4">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[.16em] px-2.5 mb-1.5" style={{ color: 'rgba(255,255,255,.35)' }}>
                {SEC_LABELS[sec] ?? sec}
              </div>
              {secItems.map((item) => {
                const active = isActive(item.id)
                return (
                  <Link
                    key={item.id}
                    href={`/dashboard/${item.id}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all mb-0.5 border border-transparent no-underline"
                    style={{
                      color: active ? 'var(--nav-active)' : 'var(--nav-text)',
                      background: active ? 'var(--nav-active-bg)' : 'transparent',
                      borderColor: active ? 'rgba(0,194,122,.20)' : 'transparent',
                    }}
                  >
                    <span className="text-sm w-4 text-center">{item.icon}</span>
                    {item.label}
                    {item.id === 'notificaciones' && unreadCount > 0 && (
                      <span className="ml-auto font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--r)', color: '#fff' }}>
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        <div className="p-3 border-t" style={{ borderColor: 'var(--nav-border)' }}>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl mb-2.5" style={{ background: 'rgba(255,255,255,.06)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${user.color}33`, color: user.color }}>
              {initials(user.nombre)}
            </div>
            <div>
              <div className="text-xs font-semibold text-white">{user.nombre}</div>
              <div className="font-mono text-[10px]" style={{ color: 'var(--nav-text)' }}>{r.label}</div>
            </div>
          </div>
          <form action={logout}>
            <button type="submit" className="w-full px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer" style={{ background: 'rgba(255,255,255,.07)', color: 'var(--nav-text)', border: '1px solid var(--nav-border)' }}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
