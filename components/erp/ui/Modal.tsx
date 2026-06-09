'use client'

import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  maxWidth?: number
}

export function Modal({ open, onClose, title, subtitle, children, maxWidth = 560 }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div className={`modal-bg ${open ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth }}>
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-lg text-sm font-mono cursor-pointer transition-all border"
          style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text3)' }}
        >
          ✕
        </button>
        {title && (
          <div className="text-xl font-black tracking-tight mb-1" style={{ color: 'var(--text)' }}>{title}</div>
        )}
        {subtitle && (
          <div className="text-xs mb-4" style={{ color: 'var(--text3)' }}>{subtitle}</div>
        )}
        {children}
      </div>
    </div>
  )
}
