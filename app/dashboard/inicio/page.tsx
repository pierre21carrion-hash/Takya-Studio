import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { usd } from '@/lib/types'

export default async function InicioDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()

  const now = new Date()
  const h = now.getHours()
  const greeting = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'

  const mesStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
  const mesEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().slice(0, 10)

  const [{ data: ventasMes }, { data: gastosMes }, { count: proyectosActivos }] = await Promise.all([
    supabase.from('ventas').select('monto, estado').gte('fecha', mesStart).lt('fecha', mesEnd),
    supabase.from('gastos').select('monto').gte('fecha', mesStart).lt('fecha', mesEnd),
    supabase.from('proyectos').select('id', { count: 'exact', head: true }).eq('estado', 'activo'),
  ])

  const totalVentas = (ventasMes ?? []).filter(v => v.estado === 'pagado').reduce((s, v) => s + v.monto, 0)
  const totalGastos = (gastosMes ?? []).reduce((s, g) => s + g.monto, 0)
  const utilidad = totalVentas - totalGastos

  const kpis = [
    { label: 'Ventas del mes',    value: totalVentas > 0 ? usd(totalVentas) : '—', sub: totalVentas > 0 ? 'cobradas este mes' : 'Sin ventas aún',  accent: '#00C27A' },
    { label: 'Gastos del mes',    value: totalGastos > 0 ? usd(totalGastos) : '—', sub: totalGastos > 0 ? 'registrados este mes' : 'Sin gastos aún', accent: '#C5302A' },
    { label: 'Utilidad neta',     value: totalVentas > 0 || totalGastos > 0 ? usd(utilidad) : '—', sub: utilidad >= 0 ? 'positiva este mes' : '⚠️ negativa', accent: utilidad >= 0 ? '#2C6EDB' : '#C5302A' },
    { label: 'Proyectos activos', value: proyectosActivos != null ? String(proyectosActivos) : '—', sub: proyectosActivos ? 'en curso' : 'Sin proyectos activos', accent: '#D4820A' },
  ]

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
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl"
            style={{ background: '#fff', border: '1px solid #D8D2C8', padding: '20px 24px', borderTopWidth: 3, borderTopColor: kpi.accent }}
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
          { title: 'Registrar',          href: '/dashboard/registrar',    icon: '⚡' },
          { title: 'Ventas recientes',   href: '/dashboard/ventas',       icon: '📈' },
          { title: 'Proyectos activos',  href: '/dashboard/proyectos',    icon: '🏗️' },
          { title: 'Reportes IA',        href: '/dashboard/reportes',     icon: '🤖' },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="rounded-xl no-underline flex items-center gap-4 transition-all"
            style={{ background: '#fff', border: '1px solid #D8D2C8', padding: '20px 24px', color: '#1C1714' }}
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
