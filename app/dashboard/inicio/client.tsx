'use client'

import { useState } from 'react'
import { registrarHoras } from '@/app/actions/horas'
import { Button } from '@/components/erp/ui/Button'
import { Field, Input } from '@/components/erp/ui/Input'
import { KpiCard } from '@/components/erp/ui/Card'
import { useToast } from '@/components/erp/ui/Toast'
import { ROLES, initials, curMonth, monthKey, type Role } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface Props {
  profile: any
  horas: any[]
  tareas: any[]
  horasMes: number
  horasSem: number
  proyectosActivos: string[]
}

export function MiPanelClient({ profile, horas, tareas, horasMes, horasSem, proyectosActivos }: Props) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const r = ROLES[profile.rol as Role]
  const metaMes = Math.round(profile.horas_meta * 4.3)
  const today = new Date().toISOString().slice(0, 10)

  const hora = new Date().getHours()
  const saludo = hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches'

  async function handleHoras(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const result = await registrarHoras(fd)
    setLoading(false)
    if (result?.error) toast(result.error, '⚠')
    else {
      toast('Horas registradas', '✓')
      ;(e.target as HTMLFormElement).reset()
      router.refresh()
    }
  }

  const mes = curMonth()
  const horasMap: Record<string, number> = {}
  horas.filter((h: any) => monthKey(h.fecha) === mes)
    .forEach((h: any) => { horasMap[h.fecha] = (horasMap[h.fecha] || 0) + h.horas })
  const maxH = Math.max(...Object.values(horasMap), 8)

  return (
    <div>
      {/* Header card */}
      <div
        className="relative rounded-2xl border p-6 flex items-center gap-4 mb-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,var(--card) 0%,var(--card2) 100%)', borderColor: 'var(--border)' }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'var(--g-dim)' }} />
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0 relative z-10" style={{ background: `${profile.color}22`, color: profile.color }}>
          {initials(profile.nombre)}
        </div>
        <div className="flex-1 relative z-10">
          <div className="text-xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            {saludo}, {profile.nombre.split(' ')[0]} 👋
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
            {profile.cargo} · {r?.label} · Nixo Studio
          </div>
        </div>
        <div className="text-right relative z-10">
          <div className="text-3xl font-black font-mono" style={{ color: 'var(--g)' }}>{horasSem}h</div>
          <div className="text-xs" style={{ color: 'var(--text3)' }}>esta semana</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <KpiCard label="Horas este mes" value={`${horasMes}h`} detail={`Meta: ${metaMes}h`} accent="var(--g)" />
        <KpiCard label="Proyectos activos" value={String(proyectosActivos.length)} detail="asignados a ti" accent="var(--b)" />
        <KpiCard label="Tareas pendientes" value={String(tareas.filter((t: any) => t.estado !== 'listo').length)} detail="esta semana" accent="var(--v)" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Proyectos */}
        <div className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>
            Mis proyectos asignados
          </div>
          {proyectosActivos.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text3)' }}>Sin proyectos asignados aún</p>
          ) : proyectosActivos.map((p) => (
            <div key={p} className="flex items-center justify-between py-2.5 border-b text-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--g)' }} />
                <span className="font-semibold" style={{ color: 'var(--text)' }}>{p}</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded font-semibold" style={{ background: 'var(--g-dim)', color: 'var(--g)' }}>Activo</span>
            </div>
          ))}
        </div>

        {/* Horas */}
        <div className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>
            Registrar horas trabajadas
          </div>
          <form onSubmit={handleHoras} className="flex flex-col gap-3">
            <Field label="Fecha"><Input name="fecha" type="date" defaultValue={today} /></Field>
            <Field label="Horas trabajadas">
              <Input name="horas" type="number" placeholder="8" min="0" max="24" step="0.5" required />
            </Field>
            <Field label="Descripción">
              <Input name="descripcion" placeholder="Diseño home para cliente X..." />
            </Field>
            <Button type="submit" loading={loading}>+ Registrar horas</Button>
          </form>

          <div className="font-mono text-xs font-bold uppercase tracking-widest mt-4 mb-2" style={{ color: 'var(--text3)' }}>
            Últimas entradas
          </div>
          <div className="max-h-[180px] overflow-y-auto">
            {horas.length === 0 ? (
              <p className="text-xs" style={{ color: 'var(--text3)' }}>Sin registros</p>
            ) : horas.slice(0, 5).map((h: any) => (
              <div key={h.id} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-xs w-20 flex-shrink-0" style={{ color: 'var(--text3)' }}>
                  {h.fecha?.split('-').reverse().join('/')}
                </span>
                <div className="flex-1 h-1.5 rounded overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded" style={{ width: `${(h.horas / 12 * 100).toFixed(0)}%`, background: 'var(--g)' }} />
                </div>
                <span className="font-mono text-xs font-semibold w-8 text-right" style={{ color: 'var(--g)' }}>{h.horas}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {Object.keys(horasMap).length > 0 && (
        <div className="rounded-xl border p-4 mt-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>
            Horas este mes
          </div>
          <div className="flex items-end gap-1 h-20 overflow-x-auto">
            {Array.from({ length: new Date().getDate() }, (_, i) => {
              const d = new Date()
              d.setDate(i + 1)
              const date = d.toISOString().slice(0, 10)
              const h = horasMap[date] || 0
              return (
                <div key={date} className="flex flex-col items-center gap-0.5 min-w-[14px]">
                  <div
                    className="w-2.5 rounded-sm"
                    style={{ background: h > 0 ? 'var(--g)' : 'var(--border)', height: h > 0 ? `${(h / maxH * 64).toFixed(0)}px` : '4px' }}
                    title={`${h}h el ${date}`}
                  />
                  <div className="font-mono text-[7px]" style={{ color: 'var(--text4)' }}>{String(i + 1).padStart(2, '0')}</div>
                </div>
              )
            })}
          </div>
          <div className="font-mono text-xs mt-2" style={{ color: 'var(--text3)' }}>Total mes: {horasMes}h</div>
        </div>
      )}
    </div>
  )
}
