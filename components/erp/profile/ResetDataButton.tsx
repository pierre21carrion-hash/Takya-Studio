'use client'

import { useState, useRef } from 'react'
import { resetAllData } from '@/app/actions/reset'
import { useRouter } from 'next/navigation'

const PALABRA_CLAVE = 'BORRAR TODO'

export function ResetDataButton() {
  const [open, setOpen]         = useState(false)
  const [step, setStep]         = useState<1 | 2>(1)
  const [confirmText, setConf]  = useState('')
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState<{ deleted?: Record<string, number>; error?: string } | null>(null)
  const inputRef                = useRef<HTMLInputElement>(null)
  const router                  = useRouter()

  function openModal() {
    setOpen(true); setStep(1); setConf(''); setResult(null)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  function closeModal() {
    if (loading) return
    setOpen(false); setStep(1); setConf(''); setResult(null)
  }

  async function handleReset() {
    if (confirmText !== PALABRA_CLAVE) return
    setLoading(true)
    const res = await resetAllData()
    setLoading(false)
    setResult(res)
    if (!res.error) {
      setStep(2)
      setTimeout(() => { closeModal(); router.refresh() }, 2400)
    }
  }

  const canConfirm = confirmText === PALABRA_CLAVE && !loading
  const total = result?.deleted ? Object.values(result.deleted).reduce((s, v) => s + v, 0) : 0

  return (
    <>
      <div className="rounded-[12px]" style={{ border: '1px solid rgba(197,48,42,.25)', background: 'rgba(197,48,42,.04)', padding: '20px 24px' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C5302A" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7 1L1 13h12L7 1z"/><path d="M7 6v3M7 10.5v.5"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#C5302A' }}>Zona peligrosa</span>
            </div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: '#1C1714', marginBottom: 4 }}>Reiniciar todos los datos</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#7A6F68', lineHeight: 1.5 }}>
              Elimina permanentemente ventas, gastos, proyectos, cotizaciones y todos los registros del sistema.
              Los usuarios y cuentas <strong>no se eliminan</strong>.
            </div>
          </div>
          <button onClick={openModal} className="flex-shrink-0" style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(197,48,42,.35)', background: 'rgba(197,48,42,.08)', color: '#C5302A', cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' }}>
            Reiniciar datos
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(28,23,20,.55)', backdropFilter: 'blur(4px)' }} onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="w-full max-w-[440px] rounded-[16px]" style={{ background: '#FDFCFA', border: '1px solid rgba(28,23,20,.14)', boxShadow: '0 24px 64px rgba(28,23,20,.20)', animation: 'modalScale .18s ease both' }}>
            {step === 1 ? (
              <div style={{ padding: '28px' }}>
                <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(197,48,42,.10)' }}>
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="#C5302A" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M7 1L1 13h12L7 1z"/><path d="M7 6v3M7 10.5v.5"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 700, color: '#1C1714' }}>¿Reiniciar todos los datos?</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C5302A', marginTop: 2 }}>Esta acción es irreversible</div>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: '#7A6F68', display: 'block', marginBottom: 8 }}>
                    Escribe <strong style={{ color: '#C5302A' }}>{PALABRA_CLAVE}</strong> para confirmar:
                  </label>
                  <input ref={inputRef} type="text" value={confirmText} onChange={(e) => setConf(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && canConfirm) handleReset() }} placeholder={PALABRA_CLAVE} autoComplete="off" spellCheck={false}
                    style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 9, border: confirmText === PALABRA_CLAVE ? '1px solid rgba(197,48,42,.70)' : '1px solid rgba(28,23,20,.18)', background: '#fff', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: '#1C1714', outline: 'none', letterSpacing: '0.04em', boxSizing: 'border-box' }}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={closeModal} style={{ flex: 1, height: 44, borderRadius: 9, border: '1px solid rgba(28,23,20,.18)', background: 'transparent', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#3D3530', cursor: 'pointer' }}>Cancelar</button>
                  <button onClick={handleReset} disabled={!canConfirm} style={{ flex: 1, height: 44, borderRadius: 9, border: 'none', background: canConfirm ? '#C5302A' : 'rgba(197,48,42,.25)', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: canConfirm ? '#fff' : 'rgba(255,255,255,.60)', cursor: canConfirm ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {loading ? 'Eliminando...' : '✕ Reiniciar todo'}
                  </button>
                </div>
                {result?.error && <div style={{ marginTop: 14, fontFamily: 'var(--font-ui)', fontSize: 13, color: '#C5302A', textAlign: 'center' }}>{result.error}</div>}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center" style={{ padding: '48px 28px', textAlign: 'center' }}>
                <div className="flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,194,122,.12)', marginBottom: 16 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C27A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: '#1C1714', marginBottom: 6 }}>Datos eliminados</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#7A6F68' }}>{total} registro{total !== 1 ? 's' : ''} eliminado{total !== 1 ? 's' : ''}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
