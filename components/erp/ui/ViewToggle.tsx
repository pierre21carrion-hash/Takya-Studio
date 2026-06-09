'use client'

type View = 'kanban' | 'lista' | 'calendario'

const OPTIONS: { id: View; label: string; icon: React.ReactNode }[] = [
  {
    id: 'kanban',
    label: 'Kanban',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x=".75" y=".75" width="3" height="11.5" rx=".75"/>
        <rect x="5" y=".75" width="3" height="7" rx=".75"/>
        <rect x="5" y="9.5" width="3" height="2.75" rx=".75"/>
        <rect x="9.25" y=".75" width="3" height="4" rx=".75"/>
        <rect x="9.25" y="6.5" width="3" height="5.75" rx=".75"/>
      </svg>
    ),
  },
  {
    id: 'lista',
    label: 'Lista',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M1 3h11M1 6.5h11M1 10h11"/>
      </svg>
    ),
  },
  {
    id: 'calendario',
    label: 'Calendario',
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x=".75" y="2" width="11.5" height="10.25" rx="1.25"/>
        <path d="M4 .75v2M9 .75v2M.75 5.5h11.5"/>
      </svg>
    ),
  },
]

interface ViewToggleProps {
  value: View
  onChange: (v: View) => void
  options?: View[]
}

export function ViewToggle({ value, onChange, options }: ViewToggleProps) {
  const visible = options ? OPTIONS.filter((o) => options.includes(o.id)) : OPTIONS
  return (
    <div
      className="flex rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
    >
      {visible.map((opt) => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium cursor-pointer transition-all"
            style={{
              background: active ? 'var(--g)' : 'transparent',
              color: active ? '#fff' : 'var(--text3)',
              borderRight: '1px solid var(--border)',
              fontFamily: 'var(--font-ui)',
            }}
            title={opt.label}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
