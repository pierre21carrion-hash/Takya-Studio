interface CardProps {
  children: React.ReactNode
  className?: string
  accent?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function Card({ children, className = '', accent, style, onClick }: CardProps) {
  return (
    <div
      className={`rounded-[14px] border p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: '#ffffff',
        borderColor: 'rgba(28,23,20,.14)',
        boxShadow: 'var(--sh-card)',
        borderTopColor: accent ?? undefined,
        borderTopWidth: accent ? 3 : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.10em',
        color: '#7A6F68',
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

interface TrendProps {
  label: string
  positive?: boolean
  neutral?: boolean
}

export function KpiCard({
  label, value, detail, accent, trend,
}: {
  label: string
  value: string
  detail?: string
  accent?: string
  trend?: TrendProps
  detailClass?: string
}) {
  return (
    <div
      className="rounded-[14px] border"
      style={{
        background: '#ffffff',
        borderColor: 'rgba(28,23,20,.14)',
        borderTopColor: accent,
        borderTopWidth: accent ? 3 : 1,
        boxShadow: '0 2px 8px rgba(28,23,20,.06)',
        padding: '24px 28px',
        minHeight: 140,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
          color: '#7A6F68',
          marginBottom: 10,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-head)',
          fontSize: 44,
          fontWeight: 800,
          lineHeight: 1,
          color: '#1C1714',
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>

      {trend && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            fontWeight: 500,
            padding: '3px 8px',
            borderRadius: 999,
            background: trend.neutral
              ? 'rgba(28,23,20,.06)'
              : trend.positive
              ? 'rgba(0,194,122,.10)'
              : 'rgba(220,38,38,.10)',
            color: trend.neutral
              ? '#7A6F68'
              : trend.positive
              ? '#00C27A'
              : '#DC2626',
          }}
        >
          {!trend.neutral && (trend.positive ? '↑' : '↓')}
          {trend.label}
        </div>
      )}

      {(trend || detail) && (
        <div style={{ borderTop: '1px solid #EBE7DD', marginTop: 14, paddingTop: 12 }}>
          {detail && (
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: '#7A6F68' }}>
              {detail}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
