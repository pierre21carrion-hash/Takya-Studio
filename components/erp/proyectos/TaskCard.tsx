'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Avatar } from '@/components/erp/ui/Avatar'
import { PriorityBadge } from '@/components/erp/ui/PriorityBadge'

interface Props {
  tarea: any
  overlay?: boolean
}

export function TaskCard({ tarea, overlay }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: tarea.id,
  })

  const dueDate = tarea.fecha_vencimiento
    ? tarea.fecha_vencimiento.split('-').reverse().join('/')
    : null
  const isOverdue =
    tarea.fecha_vencimiento && new Date(tarea.fecha_vencimiento) < new Date()

  return (
    <div
      ref={setNodeRef}
      className="kanban-card"
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.35 : 1,
        cursor: overlay ? 'grabbing' : 'grab',
        transition: isDragging ? 'opacity .1s' : undefined,
        zIndex: overlay ? 999 : undefined,
        boxShadow: overlay ? 'var(--sh-lg)' : undefined,
      }}
      {...listeners}
      {...attributes}
    >
      {tarea.prioridad && (
        <div className="mb-2">
          <PriorityBadge priority={tarea.prioridad} />
        </div>
      )}

      <div className="mb-1 leading-snug" style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
        {tarea.titulo}
      </div>

      {tarea.proyecto && (
        <div className="mb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>
          {tarea.proyecto.cliente}
        </div>
      )}

      <div className="flex items-center justify-between mt-2 gap-2">
        {tarea.asignado ? (
          <Avatar nombre={tarea.asignado.nombre} color={tarea.asignado.color} size={20} />
        ) : (
          <span />
        )}
        {dueDate && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isOverdue ? 'var(--r)' : 'var(--text4)' }}>
            {dueDate}
          </span>
        )}
      </div>
    </div>
  )
}
