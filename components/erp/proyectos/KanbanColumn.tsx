'use client'

import { useDroppable } from '@dnd-kit/core'
import { TaskCard } from './TaskCard'

interface Col { id: string; label: string; color: string }

interface Props {
  col: Col
  tareas: any[]
  onAdd?: (colId: string) => void
}

export function KanbanColumn({ col, tareas, onAdd }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id })

  return (
    <div style={{ minWidth: 280, flex: '0 0 280px', scrollSnapAlign: 'start' }}>
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: col.color }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>{col.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: `${col.color}18`, color: col.color }}>
            {tareas.length}
          </span>
          {onAdd && (
            <button
              onClick={() => onAdd(col.id)}
              className="w-5 h-5 flex items-center justify-center rounded cursor-pointer text-sm leading-none"
              style={{ background: 'var(--border)', color: 'var(--text3)', transition: 'all .15s' }}
              title="Agregar tarea"
            >
              +
            </button>
          )}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="flex flex-col gap-2 min-h-[420px] p-2 rounded-xl"
        style={{
          background: isOver ? `${col.color}08` : 'rgba(255,255,255,.025)',
          border: tareas.length === 0 ? `1.5px dashed ${isOver ? col.color : 'var(--border)'}` : `1px solid ${isOver ? col.color : 'var(--border)'}`,
          transition: 'all .15s',
        }}
      >
        {tareas.map((t) => (
          <TaskCard key={t.id} tarea={t} />
        ))}

        {tareas.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-10 text-center" style={{ color: 'var(--text4)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="mb-2 opacity-40">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            <span className="text-xs">Sin tareas</span>
          </div>
        )}
      </div>
    </div>
  )
}
