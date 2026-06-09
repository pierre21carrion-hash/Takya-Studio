'use client'

import { Avatar } from '@/components/erp/ui/Avatar'
import { ProgressBar } from '@/components/erp/ui/ProgressBar'
import { usd, fmt } from '@/lib/types'

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  activo:     { label: 'Activo',     color: 'var(--g)', bg: 'var(--g-dim)' },
  pausado:    { label: 'Pausado',    color: 'var(--a)', bg: 'var(--a-dim)' },
  completado: { label: 'Completado', color: 'var(--b)', bg: 'var(--b-dim)' },
  cancelado:  { label: 'Cancelado',  color: 'var(--r)', bg: 'var(--r-dim)' },
}

interface Props {
  proyecto: any
  tareas: any[]
}

export function ProjectCard({ proyecto: p, tareas }: Props) {
  const listas = tareas.filter((t) => t.estado === 'listo').length
  const pct = tareas.length > 0 ? Math.round((listas / tareas.length) * 100) : p.progreso
  const ec = ESTADO_CONFIG[p.estado] ?? ESTADO_CONFIG.activo

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)', transition: 'box-shadow .15s, transform .15s' }}>
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate mb-0.5" style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
            {p.cliente}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{p.plan}</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: ec.bg, color: ec.color }}>
            {ec.label}
          </span>
          {p.valor > 0 && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--g)' }}>{usd(p.valor)}</span>
          )}
        </div>
      </div>

      <ProgressBar value={pct} showLabel />

      <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          {p.responsable && <Avatar nombre={p.responsable.nombre} color={p.responsable.color} size={20} />}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>
            {p.responsable?.nombre.split(' ')[0] ?? 'Sin asignar'}
          </span>
        </div>
        {p.fecha_entrega && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text4)' }}>Entrega {fmt(p.fecha_entrega)}</span>
        )}
      </div>
    </div>
  )
}
