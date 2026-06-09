type Priority = 'urgente' | 'alta' | 'media' | 'baja'

const CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  urgente: { label: 'Urgente', color: 'var(--r)', bg: 'var(--r-dim)' },
  alta:    { label: 'Alta',    color: 'var(--a)', bg: 'var(--a-dim)' },
  media:   { label: 'Media',   color: 'var(--b)', bg: 'var(--b-dim)' },
  baja:    { label: 'Baja',    color: 'var(--text3)', bg: 'var(--border)' },
}

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const c = CONFIG[priority] ?? CONFIG.media
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 999,
        background: c.bg,
        color: c.color,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, flexShrink: 0, display: 'inline-block' }} />
      {c.label}
    </span>
  )
}
