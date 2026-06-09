'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { crearActivo, actualizarEstadoActivo, eliminarActivo } from '@/app/actions/activos'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/erp/ui/Input'
import { Modal } from '@/components/erp/ui/Modal'
import { useToast } from '@/components/erp/ui/Toast'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { fmt, type ActivoDigital, type TipoActivo } from '@/lib/types'
import { differenceInDays, parseISO } from 'date-fns'

const TIPO_LABELS: Record<TipoActivo, string> = {
  dominio: 'Dominio',
  hosting: 'Hosting',
  repo: 'Repositorio',
  acceso: 'Acceso',
  otro: 'Otro',
}

const TIPO_ICONS: Record<TipoActivo, string> = {
  dominio: '🌐', hosting: '🖥', repo: '📦', acceso: '🔑', otro: '📁',
}

const ESTADO_CFG = {
  activo:      { label: 'Activo',       bg: 'rgba(0,194,122,.12)',   color: '#00C27A' },
  por_renovar: { label: 'Por renovar',  bg: 'rgba(212,130,10,.12)',  color: '#D4820A' },
  vencido:     { label: 'Vencido',      bg: 'rgba(220,38,38,.12)',   color: '#DC2626' },
}

interface Props { activos: ActivoDigital[] }

export function ActivosClient({ activos }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState<TipoActivo | 'todos'>('todos')
  const { toast } = useToast()
  const router = useRouter()

  const porVencer = useMemo(() =>
    activos.filter(a => {
      if (!a.fecha_vencimiento) return false
      const d = differenceInDays(parseISO(a.fecha_vencimiento), new Date())
      return d >= 0 && d <= 30
    }), [activos])

  const filtered = filtroTipo === 'todos' ? activos : activos.filter(a => a.tipo === filtroTipo)

  async function handleCrear(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const result = await crearActivo(new FormData(e.currentTarget))
    setLoading(false)
    if (result?.error) { toast(result.error, '⚠'); return }
    toast('Activo registrado', '✓')
    setOpen(false)
    router.refresh()
  }

  async function handleEliminar(id: string, nombre: string) {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return
    await eliminarActivo(id)
    toast(`${nombre} eliminado`, '✓')
    router.refresh()
  }

  return (
    <div>
      <PageHeader
        title="Activos Digitales"
        subtitle={`${activos.length} activos registrados${porVencer.length > 0 ? ` · ⚠ ${porVencer.length} vencen pronto` : ''}`}
        actions={<Button size="sm" onClick={() => setOpen(true)}>+ Registrar activo</Button>}
      />

      {/* Alertas vencimiento */}
      {porVencer.length > 0 && (
        <div className="rounded-xl border-l-4 p-4 mb-5 flex items-start gap-3"
          style={{ background: 'rgba(212,130,10,.08)', borderColor: '#D4820A', border: '1px solid rgba(212,130,10,.25)', borderLeftWidth: 4 }}>
          <span className="text-xl flex-shrink-0">⚠</span>
          <div>
            <div className="font-bold text-sm mb-1" style={{ color: '#D4820A' }}>Activos próximos a vencer (30 días)</div>
            <div className="flex flex-wrap gap-2">
              {porVencer.map(a => {
                const d = differenceInDays(parseISO(a.fecha_vencimiento!), new Date())
                return (
                  <span key={a.id} className="font-mono text-xs px-2 py-1 rounded-full"
                    style={{ background: 'rgba(212,130,10,.15)', color: '#D4820A' }}>
                    {TIPO_ICONS[a.tipo]} {a.nombre} — {d === 0 ? 'hoy' : `${d}d`}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['todos', 'dominio', 'hosting', 'repo', 'acceso', 'otro'] as const).map(t => (
          <button key={t}
            onClick={() => setFiltroTipo(t)}
            className="font-mono text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer border transition-all"
            style={{
              background: filtroTipo === t ? 'var(--g)' : 'var(--card)',
              color: filtroTipo === t ? '#fff' : 'var(--text3)',
              borderColor: filtroTipo === t ? 'var(--g)' : 'var(--border)',
            }}>
            {t === 'todos' ? 'Todos' : `${TIPO_ICONS[t as TipoActivo]} ${TIPO_LABELS[t as TipoActivo]}`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border flex flex-col items-center justify-center py-20 text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="text-4xl mb-4">📂</div>
          <div className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>Sin activos registrados</div>
          <div className="text-sm mb-5" style={{ color: 'var(--text3)' }}>Registra dominios, hostings y repositorios de tus clientes</div>
          <Button size="sm" onClick={() => setOpen(true)}>+ Registrar activo</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map(a => {
            const est = ESTADO_CFG[a.estado]
            const diasVenc = a.fecha_vencimiento
              ? differenceInDays(parseISO(a.fecha_vencimiento), new Date())
              : null
            return (
              <div key={a.id} className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{TIPO_ICONS[a.tipo]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{a.nombre}</div>
                    <div className="font-mono text-xs truncate" style={{ color: 'var(--text3)' }}>{a.cliente}</div>
                    {a.url && (
                      <a href={a.url} target="_blank" rel="noopener noreferrer"
                        className="font-mono text-[10px] truncate block"
                        style={{ color: 'var(--g)' }}>{a.url}</a>
                    )}
                  </div>
                  <span className="font-mono text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: est.bg, color: est.color }}>{est.label}</span>
                </div>
                <div className="px-4 pb-3 border-t pt-3 space-y-1" style={{ borderColor: 'var(--border)' }}>
                  {a.fecha_vencimiento && (
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text3)' }}>Vencimiento</span>
                      <span className="font-mono font-semibold"
                        style={{ color: diasVenc !== null && diasVenc <= 30 ? '#D4820A' : 'var(--text2)' }}>
                        {fmt(a.fecha_vencimiento)}{diasVenc !== null && diasVenc <= 30 ? ` (${diasVenc}d)` : ''}
                      </span>
                    </div>
                  )}
                  {a.costo_anual > 0 && (
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text3)' }}>Costo/año</span>
                      <span className="font-mono font-semibold" style={{ color: 'var(--text2)' }}>${a.costo_anual}</span>
                    </div>
                  )}
                  {a.registrador && (
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text3)' }}>Registrador</span>
                      <span className="font-mono" style={{ color: 'var(--text2)' }}>{a.registrador}</span>
                    </div>
                  )}
                  {a.notas_referencia && (
                    <div className="mt-2 rounded-lg p-2 text-xs italic" style={{ background: 'var(--card2)', color: 'var(--text3)' }}>
                      🔒 {a.notas_referencia}
                    </div>
                  )}
                </div>
                <div className="px-4 pb-3 flex gap-1.5">
                  {a.estado === 'activo' && (
                    <Button size="xs" variant="ghost" onClick={async () => {
                      await actualizarEstadoActivo(a.id, 'por_renovar')
                      toast('Marcado por renovar', '✓')
                      router.refresh()
                    }}>Marcar por renovar</Button>
                  )}
                  <Button size="xs" variant="red" onClick={() => handleEliminar(a.id, a.nombre)}>Eliminar</Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Registrar Activo Digital">
        <form onSubmit={handleCrear} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cliente *"><Input name="cliente" placeholder="Pastelería Dulce" required /></Field>
            <Field label="Proyecto"><Input name="proyecto" placeholder="Web corporativa" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo *">
              <Select name="tipo" required>
                {(Object.keys(TIPO_LABELS) as TipoActivo[]).map(t => (
                  <option key={t} value={t}>{TIPO_ICONS[t]} {TIPO_LABELS[t]}</option>
                ))}
              </Select>
            </Field>
            <Field label="Nombre *"><Input name="nombre" placeholder="pasteleria-dulce.com" required /></Field>
          </div>
          <Field label="URL"><Input name="url" type="url" placeholder="https://pasteleria-dulce.com" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Registrador"><Input name="registrador" placeholder="GoDaddy, Cloudflare..." /></Field>
            <Field label="Fecha vencimiento"><Input name="fecha_vencimiento" type="date" /></Field>
          </div>
          <Field label="Costo anual (USD)"><Input name="costo_anual" type="number" placeholder="12" /></Field>
          <Field label="Referencia de accesos (NO contraseñas)">
            <Textarea name="notas_referencia" placeholder="Ver 1Password > bóveda Clientes > Pastelería Dulce. Credenciales Hosting en entrada 'cPanel Dulce'." />
          </Field>
          <div className="rounded-lg p-2.5 text-xs" style={{ background: 'rgba(212,130,10,.08)', color: '#D4820A', border: '1px solid rgba(212,130,10,.20)' }}>
            🔒 Nunca guardes contraseñas aquí. Usa 1Password o Bitwarden y escribe solo la referencia de dónde encontrarlas.
          </div>
          <div className="flex gap-2 mt-1">
            <Button type="submit" loading={loading} className="flex-1">Registrar activo</Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
