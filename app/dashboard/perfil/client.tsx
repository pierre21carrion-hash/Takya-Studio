'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { resetAllData } from '@/app/actions/reset'
import { logout } from '@/app/dashboard/actions'
import type { UserProfile } from '@/lib/erp/types'
import { ROLES } from '@/lib/erp/types'

export function PerfilClient({ profile }: { profile: UserProfile }) {
  const [confirmText, setConfirmText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const rolInfo = ROLES[profile.rol]

  async function handleEliminar() {
    setLoading(true)
    setError('')
    const res = await resetAllData()
    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }
    setDone(true)
    setTimeout(async () => {
      await logout()
    }, 1500)
  }

  return (
    <div style={{ maxWidth: 600 }}>

      {/* Info del usuario */}
      <div className="rounded-2xl border p-6 mb-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
            style={{ background: `${profile.color}22`, color: profile.color }}
          >
            {profile.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
          </div>
          <div>
            <div className="text-xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--font-ui)' }}>{profile.nombre}</div>
            <div className="text-sm" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{profile.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Cargo', value: profile.cargo },
            { label: 'Rol', value: rolInfo?.label ?? profile.rol },
            { label: 'ID de usuario', value: profile.id.slice(0, 8) + '...' },
            { label: 'Miembro desde', value: new Date(profile.created_at).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' }) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl p-3" style={{ background: 'var(--card2)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-mono font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>{label}</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text)', fontFamily: 'var(--font-ui)' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Zona de peligro */}
      <div className="rounded-2xl border p-6" style={{ background: 'var(--card)', borderColor: '#FCA5A5' }}>
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span className="font-bold text-sm" style={{ color: '#DC2626', fontFamily: 'var(--font-ui)' }}>Zona de peligro</span>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--text3)', fontFamily: 'var(--font-ui)' }}>
          Elimina todos los datos del sistema: ventas, gastos, proyectos, cotizaciones, contratos y más. Esta acción no se puede deshacer.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer border transition-all"
          style={{ background: 'transparent', borderColor: '#DC2626', color: '#DC2626', fontFamily: 'var(--font-ui)' }}
        >
          Eliminar todos los datos →
        </button>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            backgroundColor: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '72px 16px 16px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div style={{
            width: '100%', maxWidth: 440,
            background: 'var(--card)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          }}>
            <div style={{ padding: '24px 24px 0' }}>
              <div className="text-lg font-bold mb-2" style={{ color: '#DC2626', fontFamily: 'var(--font-ui)' }}>
                ¿Eliminar todos los datos?
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)', lineHeight: 1.6 }}>
                Se borrarán permanentemente: ventas, gastos, proyectos, tareas, cotizaciones, contratos, notificaciones y horas. <strong>No hay forma de recuperarlos.</strong>
              </p>

              {done ? (
                <div className="rounded-xl p-4 mb-4 text-center" style={{ background: 'rgba(22,163,74,.1)', color: '#16a34a', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
                  ✓ Datos eliminados. Cerrando sesión...
                </div>
              ) : (
                <>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>
                    Escribe ELIMINAR para confirmar
                  </div>
                  <input
                    value={confirmText}
                    onChange={e => setConfirmText(e.target.value)}
                    placeholder="ELIMINAR"
                    className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none mb-3"
                    style={{
                      borderColor: confirmText === 'ELIMINAR' ? '#DC2626' : 'var(--border2)',
                      background: 'var(--card)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-mono)',
                      boxSizing: 'border-box',
                    }}
                  />
                  {error && (
                    <p className="text-xs mb-3" style={{ color: '#DC2626' }}>{error}</p>
                  )}
                </>
              )}
            </div>

            {!done && (
              <div style={{ padding: '0 24px 24px', display: 'flex', gap: 8 }}>
                <button
                  onClick={() => { setShowModal(false); setConfirmText(''); setError('') }}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold cursor-pointer border"
                  style={{ background: 'var(--card2)', borderColor: 'var(--border)', color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEliminar}
                  disabled={confirmText !== 'ELIMINAR' || loading}
                  className="flex-1 rounded-xl py-2.5 text-sm font-bold cursor-pointer border-none transition-all"
                  style={{
                    background: confirmText === 'ELIMINAR' ? '#DC2626' : 'var(--card2)',
                    color: confirmText === 'ELIMINAR' ? '#fff' : 'var(--text3)',
                    fontFamily: 'var(--font-ui)',
                    opacity: loading ? 0.7 : 1,
                    cursor: confirmText !== 'ELIMINAR' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Eliminando...' : 'Sí, eliminar todo'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
