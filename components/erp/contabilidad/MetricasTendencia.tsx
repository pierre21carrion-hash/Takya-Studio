import { ProgressBar } from '@/components/erp/ui/ProgressBar'

interface Props {
  ticketPromedio: number
  proyeccionMes: number
  margenOperativo: number
  tendenciaTicket?: 'up' | 'down' | 'neutral'
}

function usd(n: number) {
  return n >= 1000
    ? `$${(n / 1000).toFixed(1)}k`
    : `$${n.toFixed(0)}`
}

export function MetricasTendencia({ ticketPromedio, proyeccionMes, margenOperativo, tendenciaTicket = 'neutral' }: Props) {
  const cards = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2" y="2" width="5" height="5" rx="1"/>
          <rect x="9" y="2" width="5" height="5" rx="1"/>
          <rect x="2" y="9" width="5" height="5" rx="1"/>
          <rect x="9" y="9" width="5" height="5" rx="1"/>
        </svg>
      ),
      label: 'TICKET PROMEDIO',
      valor: usd(ticketPromedio),
      sub: tendenciaTicket === 'up' ? '↑ vs mes anterior' : tendenciaTicket === 'down' ? '↓ vs mes anterior' : '= mes anterior',
      subColor: tendenciaTicket === 'up' ? '#00C27A' : tendenciaTicket === 'down' ? '#C5302A' : '#7A6F68',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="1,12 5,7.5 8.5,9.5 14,3"/>
          <path d="M11 3h3v3"/>
        </svg>
      ),
      label: 'PROYECCIÓN MES',
      valor: usd(proyeccionMes),
      sub: 'Basado en ritmo actual',
      subColor: '#7A6F68',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 14 L8 2 L14 14"/>
          <path d="M5 9h6"/>
        </svg>
      ),
      label: 'MARGEN OPERATIVO',
      valor: `${Math.max(0, margenOperativo).toFixed(0)}%`,
      sub: null as string | null,
      subColor: '#7A6F68',
      progress: Math.max(0, Math.min(100, margenOperativo)),
    },
  ] as const

  return (
    <div className="grid grid-cols-3 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: '#F0EDE5',
            borderRadius: 12,
            padding: '16px 20px',
            border: '1px solid rgba(28,23,20,.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: '#7A6F68' }}>{card.icon}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A6F68' }}>
              {card.label}
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 700, color: '#1C1714', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {card.valor}
          </div>

          {'progress' in card && card.progress !== undefined ? (
            <div style={{ marginTop: 12 }}>
              <ProgressBar value={card.progress} showLabel />
            </div>
          ) : card.sub ? (
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: card.subColor, marginTop: 8 }}>
              {card.sub}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
