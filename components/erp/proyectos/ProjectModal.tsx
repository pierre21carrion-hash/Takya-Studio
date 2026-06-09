'use client'

import { useEffect, useRef } from 'react'
import { Field, Input, Select } from '@/components/erp/ui/Input'
import { Button } from '@/components/erp/ui/Button'

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (fd: FormData) => void
  loading: boolean
  users: any[]
  proyecto?: any
}

export function ProjectModal({ open, onClose, onSubmit, loading, users, proyecto }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(new FormData(e.currentTarget))
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-5"
      style={{ background: 'rgba(28,23,20,.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={dialogRef}
        className="animate-modal w-full max-w-lg"
        style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--sh-lg)' }}
        role="dialog"
        aria-modal
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
              {proyecto ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text3)' }}>
              {proyecto ? 'Actualiza los datos del proyecto' : 'Añade un proyecto al sistema'}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer ml-4 flex-shrink-0" style={{ background: 'var(--border)', color: 'var(--text3)', transition: 'all .15s' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cliente"><Input name="cliente" placeholder="Valeria Morocho" required defaultValue={proyecto?.cliente} /></Field>
            <Field label="Plan">
              <Select name="plan" defaultValue={proyecto?.plan}>
                <option>Plan Inicio</option>
                <option>Plan Escala</option>
                <option>Plan Dominio</option>
                <option>Personalizado</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor (USD)"><Input name="valor" type="number" placeholder="299" defaultValue={proyecto?.valor} /></Field>
            <Field label="Responsable">
              <Select name="responsable_id" defaultValue={proyecto?.responsable_id ?? ''}>
                <option value="">Sin asignar</option>
                {users.map((u: any) => <option key={u.id} value={u.id}>{u.nombre}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha inicio"><Input name="fecha_inicio" type="date" defaultValue={proyecto?.fecha_inicio ?? new Date().toISOString().slice(0, 10)} /></Field>
            <Field label="Fecha entrega"><Input name="fecha_entrega" type="date" defaultValue={proyecto?.fecha_entrega} /></Field>
          </div>
          {proyecto && (
            <Field label="Estado">
              <Select name="estado" defaultValue={proyecto.estado}>
                <option value="activo">Activo</option>
                <option value="pausado">Pausado</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </Select>
            </Field>
          )}
          <div className="flex gap-2 mt-2">
            <Button type="submit" loading={loading} className="flex-1">{proyecto ? 'Guardar cambios' : 'Crear proyecto'}</Button>
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
