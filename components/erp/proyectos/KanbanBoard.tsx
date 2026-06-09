'use client'

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { KanbanColumn } from './KanbanColumn'
import { TaskCard } from './TaskCard'
import { actualizarEstadoTarea } from '@/app/actions/proyectos'
import { useToast } from '@/components/erp/ui/Toast'

const COLS = [
  { id: 'por_hacer', label: 'Por hacer', color: 'var(--b)' },
  { id: 'en_proceso', label: 'En proceso', color: 'var(--a)' },
  { id: 'revision',   label: 'Revisión',   color: 'var(--v)' },
  { id: 'listo',      label: 'Listo',      color: 'var(--g)' },
]

interface Props {
  tareas: any[]
  onAddTarea?: (colId: string) => void
}

export function KanbanBoard({ tareas: initialTareas, onAddTarea }: Props) {
  const [tareas, setTareas] = useState(initialTareas)
  const [activeId, setActiveId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string)
  }

  async function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over) return
    const newEstado = over.id as string
    const tarea = tareas.find((t) => t.id === active.id)
    if (!tarea || tarea.estado === newEstado) return

    const snapshot = tareas
    setTareas((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, estado: newEstado } : t))
    )

    const res = await actualizarEstadoTarea(active.id as string, newEstado)
    if (res?.error) {
      setTareas(snapshot)
      toast(res.error, '⚠')
    } else {
      router.refresh()
    }
  }

  const activeTarea = activeId ? tareas.find((t) => t.id === activeId) : null

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
        {COLS.map((col) => (
          <KanbanColumn
            key={col.id}
            col={col}
            tareas={tareas.filter((t) => t.estado === col.id)}
            onAdd={onAddTarea}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: 'cubic-bezier(.18,.67,.6,1.22)' }}>
        {activeTarea ? <TaskCard tarea={activeTarea} overlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
