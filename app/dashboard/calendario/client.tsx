'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { Modal } from '@/components/erp/ui/Modal'
import { Button } from '@/components/erp/ui/Button'
import { fmt, ETAPA_LABELS, type ProyectoExtendido, type ActivoDigital } from '@/lib/types'

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

type FiltroTipo = 'inicio' | 'entrega' | 'entrega_real' | 'activo_vence'

interface CalEvent {
  label: string
  color: string
  tipo: FiltroTipo
  detail: string
}

interface Props {
  proyectos: ProyectoExtendido[]
  activos: ActivoDigital[]
}

const TIPO_META: Record<FiltroTipo, { color: string; label: string }> = {
  inicio:        { color: '#2563EB', label: 'Inicio proyecto' },
  entrega:       { color: '#F59E0B', label: 'Entrega prometida' },
  entrega_real:  { color: '#00C27A', label: 'Entrega real' },
  activo_vence:  { color: '#DC2626', label: 'Activo vence' },
}

function toICS(eventos: { date: string; label: string; detail: string }[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nixo Studio//Calendario ERP//ES',
    'CALSCALE:GREGORIAN',
  ]
  eventos.forEach(ev => {
    const dt = ev.date.replace(/-/g, '')
    lines.push(
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${dt}`,
      `DTEND;VALUE=DATE:${dt}`,
      `SUMMARY:${ev.label}`,
      `DESCRIPTION:${ev.detail}`,
      'END:VEVENT',
    )
  })
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

export function CalendarioClient({ proyectos, activos }: Props) {
  const now = new Date()
  const [mes, setMes] = useState(now.getMonth())
  const [año, setAño] = useState(now.getFullYear())
  const [filtros, setFiltros] = useState<Set<FiltroTipo>>(new Set(['inicio', 'entrega', 'entrega_real', 'activo_vence']))
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null)

  const prevMes = () => { if (mes === 0) { setMes(11); setAño(año - 1) } else setMes(mes - 1) }
  const nextMes = () => { if (mes === 11) { setMes(0); setAño(año + 1) } else setMes(mes + 1) }

  const toggleFiltro = (t: FiltroTipo) => {
    setFiltros(prev => {
      const next = new Set(prev)
      next.has(t) ? next.delete(t) : next.add(t)
      return next
    })
  }

  const eventos = useMemo(() => {
    const map: Record<string, CalEvent[]> = {}
    const add = (date: string | null | undefined, ev: CalEvent) => {
      if (!date) return
      if (!map[date]) map[date] = []
      map[date].push(ev)
    }

    proyectos.forEach(p => {
      add(p.fecha_inicio, { label: p.cliente, color: TIPO_META.inicio.color, tipo: 'inicio', detail: `Inicio: ${p.cliente} (${p.plan ?? ''})` })
      add(p.fecha_entrega_prometida, { label: p.cliente, color: TIPO_META.entrega.color, tipo: 'entrega', detail: `Entrega prometida: ${p.cliente} (${ETAPA_LABELS[p.etapa_actual ?? 'descubrimiento']})` })
      add(p.fecha_entrega_real, { label: p.cliente, color: TIPO_META.entrega_real.color, tipo: 'entrega_real', detail: `Entregado: ${p.cliente}` })
    })

    activos.forEach(a => {
      add(a.fecha_vencimiento, { label: a.nombre, color: TIPO_META.activo_vence.color, tipo: 'activo_vence', detail: `Vence: ${a.nombre} (${a.cliente})` })
    })

    return map
  }, [proyectos, activos])

  const primerDia = new Date(año, mes, 1).getDay()
  const diasEnMes = new Date(año, mes + 1, 0).getDate()
  const hoy = new Date().toISOString().slice(0, 10)

  const cells: (number | null)[] = [
    ...Array(primerDia).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const eventosDelDia = diaSeleccionado ? (eventos[diaSeleccionado] ?? []) : []

  function exportICS() {
    const allEvents: { date: string; label: string; detail: string }[] = []
    Object.entries(eventos).forEach(([date, evs]) => {
      evs.forEach(ev => allEvents.push({ date, label: ev.label, detail: ev.detail }))
    })
    const ics = toICS(allEvents)
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nixo-calendario.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalEventosMes = Object.entries(eventos)
    .filter(([date]) => date.startsWith(`${año}-${String(mes + 1).padStart(2, '0')}`))
    .reduce((s, [, evs]) => s + evs.filter(e => filtros.has(e.tipo)).length, 0)

  return (
    <div>
      <PageHeader
        title="Calendario"
        subtitle={`${totalEventosMes} evento${totalEventosMes !== 1 ? 's' : ''} este mes`}
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={exportICS}>↓ Exportar ICS</Button>
            <button onClick={prevMes} className="w-8 h-8 flex items-center justify-center rounded-lg border cursor-pointer" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text3)' }}>←</button>
            <span className="font-semibold text-sm min-w-[120px] text-center" style={{ color: 'var(--text)' }}>{MESES[mes]} {año}</span>
            <button onClick={nextMes} className="w-8 h-8 flex items-center justify-center rounded-lg border cursor-pointer" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text3)' }}>→</button>
          </div>
        }
      />

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.entries(TIPO_META) as [FiltroTipo, { color: string; label: string }][]).map(([tipo, meta]) => (
          <button key={tipo} onClick={() => toggleFiltro(tipo)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer"
            style={{
              background: filtros.has(tipo) ? `${meta.color}18` : 'var(--card)',
              borderColor: filtros.has(tipo) ? meta.color : 'var(--border)',
              color: filtros.has(tipo) ? meta.color : 'var(--text3)',
            }}>
            <div className="w-2 h-2 rounded-full" style={{ background: filtros.has(tipo) ? meta.color : 'var(--border)' }} />
            {meta.label}
          </button>
        ))}
      </div>

      {/* Cabecera días */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {DIAS.map(d => (
          <div key={d} className="text-center font-mono text-xs font-bold uppercase py-1" style={{ color: 'var(--text4)' }}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} className="min-h-[72px] rounded-xl" style={{ background: 'var(--card2)', opacity: 0.4 }} />
          const dateStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isToday = dateStr === hoy
          const dayEvents = (eventos[dateStr] ?? []).filter(e => filtros.has(e.tipo))
          const hasEvents = dayEvents.length > 0

          return (
            <div key={dateStr}
              className="min-h-[72px] rounded-xl border p-1.5 transition-all"
              style={{
                background: isToday ? 'rgba(0,194,122,.06)' : 'var(--card)',
                borderColor: isToday ? 'rgba(0,194,122,.4)' : hasEvents ? 'var(--border)' : 'var(--border)',
                cursor: hasEvents ? 'pointer' : 'default',
              }}
              onClick={() => hasEvents && setDiaSeleccionado(dateStr)}>
              <div className="font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mb-1"
                style={{ background: isToday ? 'var(--g)' : 'transparent', color: isToday ? '#fff' : 'var(--text3)' }}>
                {day}
              </div>
              {dayEvents.slice(0, 2).map((ev, j) => (
                <div key={j} className="text-[9px] font-mono px-1 py-0.5 rounded mb-0.5 truncate"
                  style={{ background: `${ev.color}20`, color: ev.color }}>
                  {ev.label}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-[9px] font-mono px-1" style={{ color: 'var(--text4)' }}>+{dayEvents.length - 2} más</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal día */}
      <Modal
        open={!!diaSeleccionado}
        onClose={() => setDiaSeleccionado(null)}
        title={diaSeleccionado ? fmt(diaSeleccionado) : ''}
      >
        <div className="flex flex-col gap-2">
          {eventosDelDia.map((ev, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl p-3 border"
              style={{ background: 'var(--card2)', borderColor: 'var(--border)', borderLeftWidth: 3, borderLeftColor: ev.color }}>
              <div className="flex flex-col flex-1">
                <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{ev.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{TIPO_META[ev.tipo].label}</div>
              </div>
            </div>
          ))}
          {eventosDelDia.length === 0 && (
            <div className="text-sm text-center py-4" style={{ color: 'var(--text3)' }}>Sin eventos este día</div>
          )}
        </div>
      </Modal>
    </div>
  )
}
