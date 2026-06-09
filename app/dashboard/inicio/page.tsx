import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function InicioDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()

  const now = new Date()
  const h = now.getHours()
  const greeting = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div>
      <div style={{ paddingBottom: 24, marginBottom: 32, borderBottom: '1px solid #D8D2C8' }}>
        <h1 style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 34, fontWeight: 800, color: '#1C1714', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {greeting}, {profile?.nombre?.split(' ')[0]} 👋
        </h1>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#7A6F68', marginTop: 6 }}>
          {now.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Ventas del mes',     value: '—',  sub: 'Sin datos aún',  accent: '#00C27A' },
          { label: 'Gastos del mes',     value: '—',  sub: 'Sin datos aún',  accent: '#C5302A' },
          { label: 'Utilidad neta',      value: '—',  sub: 'Sin datos aún',  accent: '#2C6EDB' },
          { label: 'Proyectos activos',  value: '—',  sub: 'Sin datos aún',  accent: '#D4820A' },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl"
            style={{ background: '#fff', border: '1px solid #D8D2C8', padding: '20px 24px' }}
          >
            <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A6F68', marginBottom: 8 }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 28, fontWeight: 800, color: kpi.accent, letterSpacing: '-0.02em' }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#B0A89F', marginTop: 4 }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2" style={{ gap: 16 }}>
        {[
          { title: 'Ventas recientes',   href: '/dashboard/ventas',       icon: '📈' },
          { title: 'Proyectos activos',  href: '/dashboard/proyectos',    icon: '🏗️' },
          { title: 'Cotizaciones',       href: '/dashboard/cotizaciones', icon: '📄' },
          { title: 'Reportes IA',        href: '/dashboard/reportes',     icon: '🤖' },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="rounded-xl no-underline flex items-center gap-4 transition-all"
            style={{
              background: '#fff',
              border: '1px solid #D8D2C8',
              padding: '20px 24px',
              color: '#1C1714',
            }}
          >
            <span style={{ fontSize: 28 }}>{card.icon}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 15, fontWeight: 700, color: '#1C1714' }}>
                {card.title}
              </div>
              <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#7A6F68', marginTop: 2 }}>
                Ver módulo →
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
