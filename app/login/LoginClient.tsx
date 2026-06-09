'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SITE_CONFIG } from '@/lib/constants'

export function LoginClient() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const router      = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (authError) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      return
    }

    const redirect = searchParams.get('redirect') ?? '/dashboard'
    router.push(redirect)
    router.refresh()
  }

  return (
    /* Full-screen overlay — z-[100] covers public Navbar */
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 100, background: '#E8E4DA', padding: '20px' }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: 420,
          background: '#FFFFFF',
          border: '1px solid #D8D2C8',
          borderRadius: 20,
          padding: '40px',
          boxShadow: '0 12px 40px rgba(28,23,20,0.10)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center" style={{ marginBottom: 32 }}>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-white"
            style={{ background: '#00C27A', marginBottom: 16 }}
          >
            T
          </div>
          <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 24, fontWeight: 800, color: '#1C1714', letterSpacing: '-0.02em' }}>
            Takya OS
          </div>
          <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#7A6F68', marginTop: 4 }}>
            Sistema interno · Takya Studio
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A6F68', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pierre@takya.studio"
              required
              autoComplete="email"
              style={{
                width: '100%',
                height: 48,
                padding: '0 14px',
                borderRadius: 10,
                border: '1px solid #D8D2C8',
                background: '#FDFCFA',
                fontFamily: 'var(--font-geist-sans)',
                fontSize: 15,
                color: '#1C1714',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color .15s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#00C27A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#D8D2C8')}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: error ? 16 : 24 }}>
            <label style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A6F68', display: 'block', marginBottom: 6 }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  height: 48,
                  padding: '0 44px 0 14px',
                  borderRadius: 10,
                  border: '1px solid #D8D2C8',
                  background: '#FDFCFA',
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: 15,
                  color: '#1C1714',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color .15s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#00C27A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#D8D2C8')}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#B0A89F',
                  padding: 0,
                }}
                tabIndex={-1}
                aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z"/>
                    <circle cx="8" cy="8" r="2.2"/>
                    <path d="M2 2l12 12"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z"/>
                    <circle cx="8" cy="8" r="2.2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginBottom: 20,
                padding: '12px 14px',
                borderLeft: '3px solid #C5302A',
                background: 'rgba(197,48,42,.06)',
                borderRadius: '0 8px 8px 0',
                fontFamily: 'var(--font-geist-sans)',
                fontSize: 13,
                color: '#C5302A',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 12,
              border: 'none',
              background: loading ? '#B0A89F' : '#00C27A',
              color: '#000',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all .15s',
            }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.6 2.6l1.4 1.4M10 10l1.4 1.4M2.6 11.4L4 10M10 4l1.4-1.4"/>
                </svg>
                Entrando...
              </>
            ) : 'Entrar'}
          </button>
        </form>

        {/* Help link */}
        <div className="text-center" style={{ marginTop: 20 }}>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hola Pierre, tengo problemas para entrar al sistema`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: 13,
              color: '#B0A89F',
              textDecoration: 'none',
            }}
          >
            ¿Problemas para entrar? Escríbenos →
          </a>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
