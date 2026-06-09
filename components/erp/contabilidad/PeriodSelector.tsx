'use client'

const PERIODS = ['Esta semana', 'Este mes', '3 meses', '6 meses', 'Este año'] as const

export type Period = typeof PERIODS[number]

interface Props {
  active: Period
  onChange: (p: Period) => void
}

export function PeriodSelector({ active, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {PERIODS.map((p) => {
        const isActive = active === p
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: isActive ? 600 : 400,
              padding: '5px 10px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: isActive ? '#00C27A' : 'transparent',
              color: isActive ? '#000' : '#7A6F68',
              transition: 'all .15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {p}
          </button>
        )
      })}
    </div>
  )
}
