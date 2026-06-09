import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return (
    <div>
      <div style={{ paddingBottom: 24, marginBottom: 32, borderBottom: '1px solid #D8D2C8' }}>
        <h1 style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 34, fontWeight: 800, color: '#1C1714', letterSpacing: '-0.03em' }}>Chat Interno</h1>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#7A6F68', marginTop: 6 }}>Módulo en configuración</p>
      </div>
      <div className="rounded-xl flex flex-col items-center justify-center" style={{ background: '#fff', border: '1px solid #D8D2C8', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>💬</div>
        <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 20, fontWeight: 700, color: '#3D3530', marginBottom: 8 }}>Módulo Chat Interno</div>
        <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 14, color: '#B0A89F', maxWidth: 360, lineHeight: 1.6 }}>Este módulo estará disponible pronto. Los datos se conectan directamente con Supabase.</div>
      </div>
    </div>
  )
}
