'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { SIDEBAR_NAV, initials, type UserProfile } from '@/lib/erp/types'
import { logout } from '@/app/dashboard/actions'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  user: UserProfile
  unreadCount?: number
}

export function MobileDrawer({ open, onClose, user, unreadCount = 0 }: MobileDrawerProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150]"
            style={{ background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-[160] flex flex-col overflow-y-auto"
            style={{ width: 260, background: '#1B2A4A' }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{ background: '#00C27A' }}>T</div>
                <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 13, fontWeight: 700, color: '#fff' }}>Takya OS</span>
              </div>
              <button type="button" onClick={onClose} style={{ color: 'rgba(255,255,255,.4)', padding: 4 }} aria-label="Cerrar menú">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4l10 10M14 4L4 14"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-3 py-4">
              {SIDEBAR_NAV.map((group) => (
                <div key={group.section} className="mb-5">
                  <div className="px-3 mb-1.5" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,.25)' }}>
                    {group.section}
                  </div>
                  {group.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 mb-0.5 no-underline"
                        style={{
                          background: active ? 'rgba(0,194,122,.15)' : 'transparent',
                          color: active ? '#00C27A' : 'rgba(255,255,255,.6)',
                          fontFamily: 'var(--font-geist-sans)',
                          fontSize: 14,
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {item.label}
                        {item.key === 'notificaciones' && unreadCount > 0 && (
                          <span className="ml-auto rounded-full flex items-center justify-center text-white" style={{ width: 16, height: 16, background: '#C5302A', fontSize: '9px' }}>
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>

            <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
              <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 mb-2" style={{ background: 'rgba(255,255,255,.05)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${user.color}22`, color: user.color }}>
                  {initials(user.nombre)}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 12, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.nombre}</div>
                  <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 9, color: 'rgba(255,255,255,.35)' }}>{user.cargo}</div>
                </div>
              </div>
              <form action={logout}>
                <button type="submit" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg" style={{ color: 'rgba(255,255,255,.35)', fontFamily: 'var(--font-geist-sans)', fontSize: 12 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M11 11l3-3-3-3M14 8H6"/>
                  </svg>
                  Salir → web pública
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
