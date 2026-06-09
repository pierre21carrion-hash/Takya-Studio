'use client'

import { Avatar } from '@/components/erp/ui/Avatar'
import { ProgressBar } from '@/components/erp/ui/ProgressBar'
import { fmt, usd } from '@/lib/types'

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  activo:     { label: 'Activo',     color: 'var(--g)', bg: 'var(--g-dim)' },
  pausado:    { label: 'Pausado',    color: 'var(--a)', bg: 'var(--a-dim)' },
  completado: { label: 'Completado', color: 'var(--b)', bg: 'var(--b-dim)' },
  cancelado:  { label: 'Cancelado',  color: 'var(--r)', bg: 'var(--r-dim)' },
}

interface Props {
  proyectos: any[]
  tareas: any[]
  onEdit?: (p: any) => void
}

export function ProjectList({ proyectos, tareas, onEdit }: Props) {
  if (proyectos.length === 0) return null

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr style={{ background: 'rgba(0,0,0,.015)', borderBottom: '1px solid var(--border)' }}>
            {['Proyecto', 'Cliente', 'Estado', 'Responsable', 'Progreso', 'Entrega', 'Acciones'].map((h) => (
              <th key={h} className="text-left px-4 py-2.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text3)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {proyectos.map((p) => {
            const ptareas = tareas.filter((t) => t.proyecto_id === p.id)
            const listas = ptareas.filter((t) => t.estado === 'listo').length
            const pct = ptareas.length > 0 ? Math.round((listas / ptareas.length) * 100) : p.progreso
            const ec = ESTADO_CONFIG[p.estado] ?? ESTADO_CONFIG.activo

            return (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background .12s' }}>
                <td className="px-4 py-3">
                  <div className="font-semibold" style={{ fontFamily: 'var(--font-head)', color: 'var(--text)' }}>{p.plan || '—'}</div>
                  {p.valor > 0 && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--g)', marginTop: 2 }}>{usd(p.valor)}</div>}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{p.cliente}</td>
                <td className="px-4 py-3">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: ec.bg, color: ec.color }}>
                    {ec.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.responsable ? (
                    <div className="flex items-center gap-2">
                      <Avatar nombre={p.responsable.nombre} color={p.responsable.color} size={20} />
                      <span style={{ color: 'var(--text2)' }}>{p.responsable.nombre.split(' ')[0]}</span>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text4)' }}>—</span>
                  )}
                </td>
                <td className="px-4 py-3" style={{ minWidth: 100 }}><ProgressBar value={pct} showLabel /></td>
                <td className="px-4 py-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text3)' }}>{fmt(p.fecha_entrega)}</td>
                <td className="px-4 py-3">
                  {onEdit && (
                    <button onClick={() => onEdit(p)} className="text-xs px-2.5 py-1 rounded-lg cursor-pointer" style={{ background: 'var(--border)', color: 'var(--text3)', fontFamily: 'var(--font-ui)', transition: 'all .15s' }}>
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
