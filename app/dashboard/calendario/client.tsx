'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/erp/layout/PageHeader'

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

interface Props {
  proyectos: any[]
}

export function CalendarioClient({ proyectos }: Props) {
  const now = new Date()
  const [mes, setMes] = useState(now.getMonth())
  const [año, setAño] = useState(now.getFullYear())

  const prevMes = () => {
    if (mes === 0) { setMes(11); setAño(año - 1) }
    else setMes(mes - 1)
  }
  const nextMes = () => {
    if (mes === 11) { setMes(0); setAño(año + 1) }
    else setMes(mes + 1)
  }

  const primerDia = new Date(año, mes, 1).getDay()
  const diasEnMes = new Date(año, mes + 1, 0).getDate()
  const hoy = new Date().toISOString().slice(0, 10)

  const eventos: Record<string, { label: string; color: string }[]> = {}
  proyectos.forEach((p: any) => {
    if (p.fecha_entrega) {
      if (!eventos[p.fecha_entrega]) eventos[p.fecha_entrega] = []
      eventos[p.fecha_entrega].push({ label: p.cliente, color: '#00C27A' })
    }
    if (p.fecha_inicio) {
      if (!eventos[p.fecha_inicio]) eventos[p.fecha_inicio] = []
      eventos[p.fecha_inicio].push({ label: `↑ ${p.cliente}`, color: '#2563EB' })
    }
  })

  const cells: (number | null)[] = [
    ...Array(primerDia).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div>
      <PageHeader
        title="Calendario"
        subtitle="Proyectos y entregas programadas"
        actions={
          <div className="flex items-center gap-3">
            <button onClick={prevMes} className="w-8 h-8 flex items-center justify-center rounded-lg border cursor-pointer" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text3)' }}>←</button>
            <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{MESES[mes]} {año}</span>
            <button onClick={nextMes} className="w-8 h-8 flex items-center justify-center rounded-lg border cursor-pointer" style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text3)' }}>→</button>
          </div>
        }
      />

      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {DIAS.map((d) => (
          <div key={d} className="text-center font-mono text-xs font-bold uppercase py-1" style={{ color: 'var(--text4)' }}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} className="cal-day other-month" />
          const dateStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isToday = dateStr === hoy
          const dayEvents = eventos[dateStr] ?? []

          return (
            <div key={dateStr} className={`cal-day ${isToday ? 'today' : ''}`}>
              <div className={`font-mono text-xs font-bold mb-1 w-5 h-5 rounded-full flex items-center justify-center`} style={{ background: isToday ? 'var(--g)' : 'transparent', color: isToday ? '#fff' : 'var(--text3)' }}>
                {day}
              </div>
              {dayEvents.map((ev, j) => (
                <div key={j} className="text-[9px] font-mono px-1 py-0.5 rounded mb-0.5 truncate" style={{ background: `${ev.color}22`, color: ev.color }}>
                  {ev.label}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00C27A' }} />
          <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>Fecha entrega</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2563EB' }} />
          <span className="font-mono text-xs" style={{ color: 'var(--text3)' }}>Inicio proyecto</span>
        </div>
      </div>

      {proyectos.length === 0 && (
        <div className="flex gap-2 rounded-xl px-4 py-3 text-sm mt-4" style={{ background: 'var(--b-dim)', border: '1px solid rgba(79,142,255,.3)', color: 'var(--b)' }}>
          <span>◈</span>
          <span>Crea proyectos para verlos en el calendario automáticamente.</span>
        </div>
      )}
    </div>
  )
}
