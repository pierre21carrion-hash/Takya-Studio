import type { CSSProperties } from 'react'

/* ─── Typography ─── */
export const t = {
  h1: {
    fontFamily: 'var(--font-head)',
    fontSize: 36,
    fontWeight: 800,
    color: '#1C1714',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  } satisfies CSSProperties,

  h2: {
    fontFamily: 'var(--font-head)',
    fontSize: 24,
    fontWeight: 700,
    color: '#1C1714',
    letterSpacing: '-0.02em',
  } satisfies CSSProperties,

  h3: {
    fontFamily: 'var(--font-head)',
    fontSize: 18,
    fontWeight: 700,
    color: '#1C1714',
  } satisfies CSSProperties,

  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.10em',
    color: '#7A6F68',
  } satisfies CSSProperties,

  mono: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: '#7A6F68',
  } satisfies CSSProperties,

  monoSm: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: '#7A6F68',
  } satisfies CSSProperties,

  body: {
    fontFamily: 'var(--font-ui)',
    fontSize: 14,
    color: '#3D3530',
    lineHeight: 1.6,
  } satisfies CSSProperties,

  bodySm: {
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    color: '#7A6F68',
    lineHeight: 1.5,
  } satisfies CSSProperties,

  num: {
    fontFamily: 'var(--font-mono)',
    fontSize: 24,
    fontWeight: 700,
    color: '#1C1714',
    letterSpacing: '-0.02em',
  } satisfies CSSProperties,
} as const

/* ─── Surfaces ─── */
export const card = {
  base: {
    background: '#ffffff',
    border: '1px solid rgba(28,23,20,.14)',
    borderRadius: 14,
    boxShadow: '0 2px 8px rgba(28,23,20,.06)',
  } satisfies CSSProperties,

  padding: { padding: '24px 28px' } satisfies CSSProperties,

  warm: {
    background: '#F0EDE5',
    border: '1px solid rgba(28,23,20,.10)',
    borderRadius: 12,
  } satisfies CSSProperties,
} as const

/* ─── Page header ─── */
export const pageHeader = {
  paddingBottom: 24,
  marginBottom: 32,
  borderBottom: '1px solid #D8D2C8',
} satisfies CSSProperties

/* ─── Grid gaps ─── */
export const gap = {
  sm: { gap: 12 } satisfies CSSProperties,
  md: { gap: 16 } satisfies CSSProperties,
  lg: { gap: 20 } satisfies CSSProperties,
  xl: { gap: 24 } satisfies CSSProperties,
} as const

/* ─── Colors ─── */
export const c = {
  green:  '#00C27A',
  navy:   '#1B2A4A',
  red:    '#C5302A',
  amber:  '#D4820A',
  blue:   '#2C6EDB',
  ink:    '#1C1714',
  ink2:   '#3D3530',
  ink3:   '#7A6F68',
  ink4:   '#B0A89F',
  border: '#D8D2C8',
  bg:     '#E8E4DA',
  bgWarm: '#F0EDE5',
  surface:'#FFFFFF',
} as const
