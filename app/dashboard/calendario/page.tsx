import { Suspense } from 'react'
import { getProyectosExtendidos } from '@/app/actions/proyectos'
import { getActivos } from '@/app/actions/activos'
import { CalendarioClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function CalendarioPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CalendarioContent />
    </Suspense>
  )
}

async function CalendarioContent() {
  const [proyectos, activos] = await Promise.all([getProyectosExtendidos(), getActivos()])
  return <CalendarioClient proyectos={proyectos} activos={activos} />
}
