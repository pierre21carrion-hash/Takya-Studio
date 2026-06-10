'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { crearUsuario, editarUsuario, eliminarUsuario } from '@/app/actions/usuarios'
import { ROLES, type UserProfile, type Role } from '@/lib/erp/types'

const COLORES = ['#2C6EDB', '#00C27A', '#D4820A', '#6D3FCC', '#C5302A', '#0891B2', '#059669', '#1B2A4A', '#7A6F68']

type FormState = {
  nombre: string; email: string; password: string
  cargo: string; rol: Role; celular: string; color: string
}

const EMPTY_FORM: FormState = {
  nombre: '', email: '', password: '', cargo: '', rol: 'asistente', celular: '', color: '#2C6EDB',
}

interface Props {
  users: UserProfile[]
  currentUserId: string
  isCeo: boolean
}

export function EquipoClient({ users, currentUserId, isCeo }: Props) {
  const [modal, setModal] = useState<'crear' | 'editar' | 'eliminar' | null>(null)
  const [selected, setSelected] = useState<UserProfile | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function openCrear() {
    setForm(EMPTY_FORM)
    setError('')
    setModal('crear')
  }

  function openEditar(u: UserProfile) {
    setSelected(u)
    setForm({ nombre: u.nombre, email: u.email, password: '', cargo: u.cargo, rol: u.rol, celular: (u as UserProfile & { celular?: string }).celular ?? '', color: u.color })
    setError('')
    setModal('editar')
  }

  function openEliminar(u: UserProfile) {
    setSelected(u)
    setModal('eliminar')
  }

  function closeModal() {
    setModal(null); setSelected(null); setError('')
  }

  function set(k: keyof FormState, v: string) {
    setForm(p => ({ ...p, [k]: v }))
  }

  async function handleCrear(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.password || !form.cargo) {
      setError('Completa todos los campos obligatorios'); return
    }
    setLoading(true); setError('')
    const res = await crearUsuario({ nombre: form.nombre, email: form.email, password: form.password, cargo: form.cargo, rol: form.rol, celular: form.celular, color: form.color })
    setLoading(false)
    if ('error' in res && res.error) { setError(res.error); return }
    closeModal(); router.refresh()
  }

  async function handleEditar(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true); setError('')
    const res = await editarUsuario(selected.id, { nombre: form.nombre, cargo: form.cargo, rol: form.rol, color: form.color, celular: form.celular })
    setLoading(false)
    if ('error' in res && res.error) { setError(res.error); return }
    closeModal(); router.refresh()
  }

  async function handleEliminar() {
    if (!selected) return
    setLoading(true)
    await eliminarUsuario(selected.id)
    setLoading(false)
    closeModal(); router.refresh()
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
            {users.length} {users.length === 1 ? 'miembro' : 'miembros'} en el equipo
          </div>
        </div>
        {isCeo && (
          <button
            onClick={openCrear}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-bold text-sm cursor-pointer border-none transition-all"
            style={{ background: 'var(--g)', color: '#fff', fontFamily: 'var(--font-ui)' }}
          >
            + Agregar usuario
          </button>
        )}
      </div>

      {/* Grid de usuarios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(u => {
          const initials = u.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
          const rolInfo = ROLES[u.rol]
          const isMe = u.id === currentUserId
          return (
            <div key={u.id} className="rounded-2xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: `${u.color}22`, color: u.color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5" style={{ color: 'var(--text)', fontFamily: 'var(--font-ui)' }}>
                      {u.nombre}
                      {isMe && <span className="text-xs font-mono px-1.5 py-0.5 rounded-full" style={{ background: 'var(--g-dim)', color: 'var(--g)' }}>tú</span>}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{u.cargo}</div>
                  </div>
                </div>
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: `${rolInfo?.color ?? '#888'}18`, color: rolInfo?.color ?? '#888', fontFamily: 'var(--font-mono)' }}
                >
                  {rolInfo?.label ?? u.rol}
                </span>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <div className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                  ✉ {u.email}
                </div>
                {(u as UserProfile & { celular?: string }).celular && (
                  <div className="text-xs" style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                    📱 {(u as UserProfile & { celular?: string }).celular}
                  </div>
                )}
              </div>

              {isCeo && !isMe && (
                <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => openEditar(u)}
                    className="flex-1 rounded-lg py-1.5 text-xs font-semibold cursor-pointer border transition-all"
                    style={{ background: 'var(--card2)', borderColor: 'var(--border)', color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openEliminar(u)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer border transition-all"
                    style={{ background: 'transparent', borderColor: '#FCA5A5', color: '#DC2626', fontFamily: 'var(--font-ui)' }}
                  >
                    Eliminar
                  </button>
                </div>
              )}
              {isCeo && isMe && (
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => openEditar(u)}
                    className="w-full rounded-lg py-1.5 text-xs font-semibold cursor-pointer border transition-all"
                    style={{ background: 'var(--card2)', borderColor: 'var(--border)', color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}
                  >
                    Editar mi perfil
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* MODAL CREAR / EDITAR */}
      {(modal === 'crear' || modal === 'editar') && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 16px 16px', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div style={{ width: '100%', maxWidth: 480, background: 'var(--card)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', margin: 'auto' }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)' }}>
                {modal === 'crear' ? '+ Nuevo usuario' : 'Editar usuario'}
              </span>
              <button onClick={closeModal} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--card2)', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--text3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            {/* Body */}
            <form onSubmit={modal === 'crear' ? handleCrear : handleEditar} style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <FormField label="Nombre completo *">
                  <FormInput value={form.nombre} onChange={v => set('nombre', v)} placeholder="Ana García" />
                </FormField>
                <FormField label="Cargo *">
                  <FormInput value={form.cargo} onChange={v => set('cargo', v)} placeholder="Diseñadora" />
                </FormField>
              </div>

              {modal === 'crear' && (
                <FormField label="Correo electrónico *">
                  <FormInput type="email" value={form.email} onChange={v => set('email', v)} placeholder="ana@nixostudio.com" />
                </FormField>
              )}

              {modal === 'crear' && (
                <FormField label="Contraseña *">
                  <FormInput type="password" value={form.password} onChange={v => set('password', v)} placeholder="Mínimo 8 caracteres" />
                </FormField>
              )}

              <FormField label="Celular">
                <FormInput type="tel" value={form.celular} onChange={v => set('celular', v)} placeholder="+593 99 123 4567" />
              </FormField>

              <FormField label="Rol">
                <select
                  value={form.rol}
                  onChange={e => set('rol', e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--card)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 14, outline: 'none' }}
                >
                  {Object.entries(ROLES).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </FormField>

              {/* Color */}
              <FormField label="Color de identificación">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {COLORES.map(c => (
                    <button
                      key={c} type="button"
                      onClick={() => set('color', c)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer',
                        outline: form.color === c ? `3px solid ${c}` : 'none',
                        outlineOffset: 2,
                        transform: form.color === c ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform .15s',
                      }}
                    />
                  ))}
                </div>
              </FormField>

              {error && <p style={{ color: '#DC2626', fontSize: 12, margin: 0 }}>{error}</p>}

              <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
                <button type="button" onClick={closeModal}
                  style={{ flex: 1, padding: '11px 0', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--text2)', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  style={{ flex: 2, padding: '11px 0', borderRadius: 12, border: 'none', background: 'var(--g)', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Guardando...' : modal === 'crear' ? 'Crear usuario' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {modal === 'eliminar' && selected && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 16px 16px' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div style={{ width: '100%', maxWidth: 400, background: 'var(--card)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px 24px 0' }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#DC2626', marginBottom: 8, fontFamily: 'var(--font-ui)' }}>¿Eliminar usuario?</div>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 20, fontFamily: 'var(--font-ui)' }}>
                Se eliminará la cuenta de <strong>{selected.nombre}</strong> ({selected.email}) permanentemente. Sus registros (ventas, tareas, etc.) se mantendrán en el sistema.
              </p>
            </div>
            <div style={{ padding: '0 24px 24px', display: 'flex', gap: 8 }}>
              <button onClick={closeModal}
                style={{ flex: 1, padding: '11px 0', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card2)', color: 'var(--text2)', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleEliminar} disabled={loading}
                style={{ flex: 1, padding: '11px 0', borderRadius: 12, border: 'none', background: '#DC2626', color: '#fff', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{label}</label>
      {children}
    </div>
  )
}

function FormInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--card)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
    />
  )
}
