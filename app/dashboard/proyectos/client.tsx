'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearProyecto, actualizarEtapaProyecto, actualizarNotasCliente } from '@/app/actions/proyectos'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/erp/ui/Input'
import { Modal } from '@/components/erp/ui/Modal'
import { useToast } from '@/components/erp/ui/Toast'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import {
  fmt, usd, ETAPAS_PROYECTO, ETAPA_LABELS, ETAPA_COLORES,
  type ProyectoExtendido, type EtapaProyecto,
} from '@/lib/types'

const PLANES = ['Plan Inicio — $149', 'Plan Escala — $299', 'Plan Dominio — $349', 'Personalizado']
const ETAPA_PCT: Record<EtapaProyecto, number> = {
  descubrimiento: 10, diseño: 30, desarrollo: 60, revision: 85, publicado: 100,
}

interface Props {
  proyectos: ProyectoExtendido[]
  tareas: any[]
  users: any[]
}

export function ProyectosClient({ proyectos, tareas, users }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [viewProyecto, setViewProyecto] = useState<ProyectoExtendido | null>(null)
  const [notasEditing, setNotasEditing] = useState(false)
  const [notasDraft, setNotasDraft] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const activos = proyectos.filter(p => p.estado === 'activo')
  const hoyStr = new Date().toISOString().slice(0, 10)
  const vencenHoy = proyectos.filter(p =>
    p.fecha_entrega_prometida === hoyStr && p.estado === 'activo'
  )
  const mananaStr = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  const vencenManana = proyectos.filter(p =>
    p.fecha_entrega_prometida === mananaStr && p.estado === 'activo'
  )

  async function handleCrear(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const result = await crearProyecto(fd)
    setLoading(false)
    if (result?.error) { toast(result.error, '⚠'); return }
    toast('Proyecto creado', '✓')
    setOpen(false)
    router.refresh()
  }

  async function handleAvanzarEtapa(p: ProyectoExtendido) {
    const idx = ETAPAS_PROYECTO.indexOf(p.etapa_actual ?? 'descubrimiento')
    if (idx >= ETAPAS_PROYECTO.length - 1) return
    const nextEtapa = ETAPAS_PROYECTO[idx + 1]
    await actualizarEtapaProyecto(p.id, nextEtapa, ETAPA_PCT[nextEtapa])
    toast(`${p.cliente} → ${ETAPA_LABELS[nextEtapa]}`, '↗')
    setViewProyecto(prev => prev ? { ...prev, etapa_actual: nextEtapa, porcentaje: ETAPA_PCT[nextEtapa] } : null)
    router.refresh()
  }

  async function handleGuardarNotas(id: string) {
    await actualizarNotasCliente(id, notasDraft)
    toast('Notas actualizadas', '✓')
    setNotasEditing(false)
    router.refresh()
  }

  function copyPortalLink(token: string) {
    const url = `${window.location.origin}/portal/${token}`
    navigator.clipboard.writeText(url)
    toast('Link del portal copiado', '✓')
  }

  return (
    <div>
      <PageHeader
        title="Proyectos"
        subtitle={`${activos.length} activos · ${proyectos.length} total`}
        actions={<Button size="sm" onClick={() => setOpen(true)}>+ Nuevo proyecto</Button>}
      />

      {/* Alertas vencimiento */}
      {(vencenHoy.length > 0 || vencenManana.length > 0) && (
        <div className="rounded-xl p-4 mb-5 border-l-4"
          style={{ background: 'rgba(220,38,38,.07)', borderColor: '#DC2626', border: '1px solid rgba(220,38,38,.20)', borderLeftWidth: 4 }}>
          <div className="font-bold text-sm mb-1" style={{ color: '#DC2626' }}>🚨 Entregas próximas</div>
          {vencenHoy.map(p => <div key={p.id} className="text-xs" style={{ color: 'var(--text2)' }}>🔴 HOY — {p.cliente} ({p.plan})</div>)}
          {vencenManana.map(p => <div key={p.id} className="text-xs" style={{ color: 'var(--text2)' }}>🟡 Mañana — {p.cliente} ({p.plan})</div>)}
        </div>
      )}

      {/* Grid proyectos */}
      {proyectos.length === 0 ? (
        <div className="rounded-2xl border flex flex-col items-center justify-center py-20 text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="text-4xl mb-4">🏗</div>
          <div className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>Sin proyectos aún</div>
          <div className="text-sm mb-5" style={{ color: 'var(--text3)' }}>Crea tu primer proyecto para empezar</div>
          <Button size="sm" onClick={() => setOpen(true)}>+ Nuevo proyecto</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {proyectos.map(p => {
            const etapaActual = p.etapa_actual ?? 'descubrimiento'
            const etapaIdx = ETAPAS_PROYECTO.indexOf(etapaActual)
            const color = ETAPA_COLORES[etapaActual]
            const pct = p.porcentaje ?? ETAPA_PCT[etapaActual]
            return (
              <div key={p.id}
                className="rounded-2xl border overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                onClick={() => setViewProyecto(p)}>
                <div className="h-1.5" style={{ background: color, width: `${pct}%`, transition: 'width .3s' }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{p.cliente}</div>
                      <div className="font-mono text-xs" style={{ color: 'var(--text3)' }}>{p.plan}</div>
                    </div>
                    <span className="font-mono text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                      style={{ background: `${color}18`, color }}>
                      {ETAPA_LABELS[etapaActual]}
                    </span>
                  </div>
                  {/* Timeline mini */}
                  <div className="flex items-center gap-1 mb-3">
                    {ETAPAS_PROYECTO.map((etapa, i) => (
                      <div key={etapa} className="flex items-center gap-1 flex-1">
                        <div className="w-3 h-3 rounded-full flex-shrink-0 border-2 flex items-center justify-center"
                          style={{
                            background: i <= etapaIdx ? color : 'var(--card2)',
                            borderColor: i <= etapaIdx ? color : 'var(--border)',
                          }}>
                          {i === etapaIdx && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        {i < ETAPAS_PROYECTO.length - 1 && (
                          <div className="h-0.5 flex-1" style={{ background: i < etapaIdx ? color : 'var(--border)' }} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: 'var(--text3)' }}>{pct}% completo</span>
                    {p.fecha_entrega_prometida && (
                      <span className="font-mono" style={{ color: 'var(--text3)' }}>Entrega: {fmt(p.fecha_entrega_prometida)}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal nuevo proyecto */}
      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo Proyecto">
        <form onSubmit={handleCrear} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cliente *"><Input name="cliente" placeholder="Pastelería Dulce" required /></Field>
            <Field label="Plan">
              <Select name="plan">
                <option value="">Sin plan</option>
                {PLANES.map(p => <option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha inicio"><Input name="fecha_inicio" type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></Field>
            <Field label="Fecha entrega prometida"><Input name="fecha_entrega_prometida" type="date" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor (USD)"><Input name="valor" type="number" placeholder="349" /></Field>
            <Field label="Responsable">
              <Select name="responsable_id">
                <option value="">Sin asignar</option>
                {users.map((u: any) => <option key={u.id} value={u.id}>{u.nombre}</option>)}
              </Select>
            </Field>
          </div>
          <div className="flex gap-2 mt-1">
            <Button type="submit" loading={loading} className="flex-1">Crear proyecto</Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>

      {/* Modal detalle proyecto */}
      <Modal open={!!viewProyecto} onClose={() => setViewProyecto(null)} title={viewProyecto?.cliente ?? ''} subtitle={viewProyecto?.plan} maxWidth={640}>
        {viewProyecto && (() => {
          const etapa = viewProyecto.etapa_actual ?? 'descubrimiento'
          const etapaIdx = ETAPAS_PROYECTO.indexOf(etapa)
          const color = ETAPA_COLORES[etapa]
          const pct = viewProyecto.porcentaje ?? ETAPA_PCT[etapa]
          return (
            <div className="flex flex-col gap-4">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text3)' }}>
                  <span>Progreso</span><span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-1">
                {ETAPAS_PROYECTO.map((e, i) => (
                  <div key={e} className="flex items-center gap-1 flex-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[7px] font-bold"
                        style={{
                          background: i <= etapaIdx ? color : 'var(--card2)',
                          borderColor: i <= etapaIdx ? color : 'var(--border)',
                          color: i <= etapaIdx ? '#fff' : 'var(--text3)',
                        }}>
                        {i < etapaIdx ? '✓' : i === etapaIdx ? '●' : ''}
                      </div>
                      <div className="font-mono text-[8px] text-center" style={{ color: i <= etapaIdx ? color : 'var(--text3)' }}>
                        {ETAPA_LABELS[e].slice(0, 6)}
                      </div>
                    </div>
                    {i < ETAPAS_PROYECTO.length - 1 && (
                      <div className="h-0.5 flex-1 mb-4" style={{ background: i < etapaIdx ? color : 'var(--border)' }} />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Valor', value: viewProyecto.valor ? usd(viewProyecto.valor) : '—', color: '#00C27A' },
                  { label: 'Estado', value: viewProyecto.estado, color: 'var(--text)' },
                  { label: 'Entrega prometida', value: fmt(viewProyecto.fecha_entrega_prometida), color: 'var(--text)' },
                  { label: 'Responsable', value: viewProyecto.responsable?.nombre ?? '—', color: 'var(--text)' },
                ].map(item => (
                  <div key={item.label} className="rounded-xl p-3 border" style={{ background: 'var(--card2)', borderColor: 'var(--border)' }}>
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>{item.label}</div>
                    <div className="font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Notas para cliente */}
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-between" style={{ color: 'var(--text3)' }}>
                  <span>Notas para el cliente (visibles en portal)</span>
                  <button onClick={() => { setNotasEditing(!notasEditing); setNotasDraft(viewProyecto.notas_cliente ?? '') }}
                    className="text-[var(--g)] cursor-pointer border-none bg-transparent font-mono text-xs">
                    {notasEditing ? 'cancelar' : 'editar'}
                  </button>
                </div>
                {notasEditing ? (
                  <div className="flex flex-col gap-2">
                    <Textarea value={notasDraft} onChange={e => setNotasDraft(e.target.value)}
                      placeholder="Ej: Hemos completado el diseño. Esta semana comenzamos desarrollo..." rows={3} />
                    <Button size="sm" onClick={() => handleGuardarNotas(viewProyecto.id)}>Guardar notas</Button>
                  </div>
                ) : (
                  <div className="rounded-xl p-3 text-sm italic" style={{ background: 'var(--card2)', color: viewProyecto.notas_cliente ? 'var(--text2)' : 'var(--text3)' }}>
                    {viewProyecto.notas_cliente || 'Sin notas para el cliente aún.'}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t flex-wrap" style={{ borderColor: 'var(--border)' }}>
                {etapaIdx < ETAPAS_PROYECTO.length - 1 && (
                  <Button size="sm" onClick={() => handleAvanzarEtapa(viewProyecto)}>
                    ↗ Avanzar a {ETAPA_LABELS[ETAPAS_PROYECTO[etapaIdx + 1]]}
                  </Button>
                )}
                {viewProyecto.token_cliente && (
                  <Button size="sm" variant="ghost" onClick={() => copyPortalLink(viewProyecto.token_cliente)}>
                    🔗 Copiar link cliente
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setViewProyecto(null)} className="ml-auto">Cerrar</Button>
              </div>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
