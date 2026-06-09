'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearLead, moverLead, eliminarLead } from '@/app/actions/crm'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/erp/ui/Input'
import { Modal } from '@/components/erp/ui/Modal'
import { useToast } from '@/components/erp/ui/Toast'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { usd, ETAPAS_CRM, ETAPA_CRM_LABELS, type Lead, type EtapaLead } from '@/lib/types'
import { differenceInDays, parseISO } from 'date-fns'

const PLANES = ['Plan Inicio — $149', 'Plan Escala — $299', 'Plan Dominio — $349', 'Personalizado']

const ETAPA_COLORS: Record<EtapaLead, string> = {
  prospecto:         '#7C3AED',
  propuesta_enviada: '#2563EB',
  negociando:        '#D97706',
  ganado:            '#059669',
  perdido:           '#DC2626',
}

interface Props { leads: Lead[]; users: any[] }

export function CRMClient({ leads, users }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [viewLead, setViewLead] = useState<Lead | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  async function handleCrear(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const result = await crearLead(new FormData(e.currentTarget))
    setLoading(false)
    if (result?.error) { toast(result.error, '⚠'); return }
    toast('Lead agregado', '✓')
    setOpen(false)
    router.refresh()
  }

  async function handleMover(lead: Lead, etapa: EtapaLead) {
    await moverLead(lead.id, etapa)
    toast(`${lead.nombre} → ${ETAPA_CRM_LABELS[etapa]}`, '↗')
    router.refresh()
  }

  async function handleEliminar(id: string, nombre: string) {
    if (!confirm(`¿Eliminar a ${nombre}?`)) return
    await eliminarLead(id)
    toast(`${nombre} eliminado`, '✓')
    setViewLead(null)
    router.refresh()
  }

  const pipeline = leads.filter(l => !['ganado', 'perdido'].includes(l.etapa))
  const potencial = pipeline.reduce((s, l) => s + l.valor_estimado, 0)
  const ganados = leads.filter(l => l.etapa === 'ganado').length
  const tasa = leads.length > 0 ? ((ganados / leads.length) * 100).toFixed(0) : '0'

  return (
    <div>
      <PageHeader
        title="CRM · Pipeline"
        subtitle={`${leads.length} contactos · ${usd(potencial)} en pipeline · ${tasa}% tasa de cierre`}
        actions={<Button size="sm" onClick={() => setOpen(true)}>+ Nuevo lead</Button>}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Prospectos',      value: String(leads.filter(l => l.etapa === 'prospecto').length),         color: '#7C3AED' },
          { label: 'En negociación',  value: String(leads.filter(l => l.etapa === 'negociando').length),        color: '#D97706' },
          { label: 'Ganados',         value: `${ganados} (${tasa}%)`,                                           color: '#059669' },
          { label: 'Pipeline ($)',    value: usd(potencial),                                                     color: '#2563EB' },
        ].map(k => (
          <div key={k.label} className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)', borderTopWidth: 3, borderTopColor: k.color }}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>{k.label}</div>
            <div className="font-black text-xl font-mono" style={{ color: 'var(--text)' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto">
        {ETAPAS_CRM.map(etapa => {
          const col = leads.filter(l => l.etapa === etapa)
          const color = ETAPA_COLORS[etapa]
          return (
            <div key={etapa} className="rounded-xl border min-w-[200px]" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              {/* Col header */}
              <div className="px-3 py-2.5 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', borderTopWidth: 3, borderTopColor: color, borderTopStyle: 'solid', borderRadius: '12px 12px 0 0' }}>
                <span className="font-mono text-xs font-bold" style={{ color }}>{ETAPA_CRM_LABELS[etapa]}</span>
                <span className="font-mono text-xs font-bold rounded-full px-2 py-0.5" style={{ background: `${color}18`, color }}>{col.length}</span>
              </div>
              <div className="p-2 flex flex-col gap-2 min-h-[200px]">
                {col.map(lead => {
                  const dias = differenceInDays(new Date(), parseISO(lead.fecha_ultimo_contacto))
                  const stale = dias >= 3
                  return (
                    <div
                      key={lead.id}
                      className="rounded-lg p-3 cursor-pointer border transition-all hover:shadow-sm"
                      style={{ background: 'var(--card2)', borderColor: stale ? 'rgba(220,38,38,.30)' : 'var(--border)' }}
                      onClick={() => setViewLead(lead)}
                    >
                      <div className="font-bold text-xs mb-0.5 truncate" style={{ color: 'var(--text)' }}>{lead.nombre}</div>
                      {lead.empresa && <div className="font-mono text-[10px] truncate" style={{ color: 'var(--text3)' }}>{lead.empresa}</div>}
                      {lead.valor_estimado > 0 && (
                        <div className="font-mono text-xs font-bold mt-1.5" style={{ color: '#00C27A' }}>{usd(lead.valor_estimado)}</div>
                      )}
                      {lead.plan_interes && (
                        <div className="font-mono text-[9px] px-1.5 py-0.5 rounded mt-1 inline-block" style={{ background: `${color}18`, color }}>{lead.plan_interes}</div>
                      )}
                      {stale && (
                        <div className="font-mono text-[9px] mt-1.5" style={{ color: '#DC2626' }}>⚠ {dias}d sin contacto</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal nuevo lead */}
      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo Lead">
        <form onSubmit={handleCrear} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre *"><Input name="nombre" placeholder="Valeria Torres" required /></Field>
            <Field label="Empresa"><Input name="empresa" placeholder="Pastelería Dulce" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="WhatsApp"><Input name="whatsapp" placeholder="+593 99 123 4567" /></Field>
            <Field label="Email"><Input name="email" type="email" placeholder="valeria@empresa.com" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Plan de interés">
              <Select name="plan_interes">
                <option value="">Sin definir</option>
                {PLANES.map(p => <option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Valor estimado ($)"><Input name="valor_estimado" type="number" placeholder="349" /></Field>
          </div>
          <Field label="Responsable">
            <Select name="responsable_id">
              <option value="">Sin asignar</option>
              {users.map((u: any) => <option key={u.id} value={u.id}>{u.nombre}</option>)}
            </Select>
          </Field>
          <Field label="Notas"><Textarea name="notas" placeholder="Interesado en diseño web + e-commerce..." /></Field>
          <div className="flex gap-2 mt-1">
            <Button type="submit" loading={loading} className="flex-1">Agregar lead</Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>

      {/* Modal detalle lead */}
      <Modal open={!!viewLead} onClose={() => setViewLead(null)} title={viewLead?.nombre ?? ''} subtitle={viewLead?.empresa}>
        {viewLead && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'WhatsApp', value: viewLead.whatsapp || '—' },
                { label: 'Email', value: viewLead.email || '—' },
                { label: 'Plan interés', value: viewLead.plan_interes || '—' },
                { label: 'Valor est.', value: viewLead.valor_estimado > 0 ? usd(viewLead.valor_estimado) : '—', color: '#00C27A' },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-3 border" style={{ background: 'var(--card2)', borderColor: 'var(--border)' }}>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>{item.label}</div>
                  <div className="font-bold text-sm" style={{ color: item.color ?? 'var(--text)' }}>{item.value}</div>
                </div>
              ))}
            </div>
            {viewLead.notas && (
              <div className="rounded-xl p-3 border" style={{ background: 'var(--card2)', borderColor: 'var(--border)' }}>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>Notas</div>
                <div className="text-sm" style={{ color: 'var(--text2)' }}>{viewLead.notas}</div>
              </div>
            )}
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>Mover a etapa</div>
              <div className="flex flex-wrap gap-1.5">
                {ETAPAS_CRM.filter(e => e !== viewLead.etapa).map(etapa => (
                  <button key={etapa}
                    onClick={() => { handleMover(viewLead, etapa); setViewLead(null) }}
                    className="font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer border-none transition-all hover:brightness-110"
                    style={{ background: `${ETAPA_COLORS[etapa]}18`, color: ETAPA_COLORS[etapa] }}>
                    → {ETAPA_CRM_LABELS[etapa]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              {viewLead.whatsapp && (
                <a href={`https://wa.me/${viewLead.whatsapp.replace(/\D/g, '')}?text=Hola ${viewLead.nombre}, te contacto de Nixo Studio`}
                  target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost">WhatsApp →</Button>
                </a>
              )}
              <Button size="sm" variant="red" onClick={() => handleEliminar(viewLead.id, viewLead.nombre)}>Eliminar</Button>
              <Button size="sm" variant="ghost" onClick={() => setViewLead(null)} className="ml-auto">Cerrar</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
