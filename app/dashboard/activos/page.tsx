import { Suspense } from 'react'
import { getActivos } from '@/app/actions/activos'
import { ActivosClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function ActivosPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ActivosContent />
    </Suspense>
  )
}

async function ActivosContent() {
  const activos = await getActivos()
  return <ActivosClient activos={activos} />
}
