import { Suspense } from 'react'
import { getRentabilidadData } from '@/app/actions/rentabilidad'
import { RentabilidadClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function RentabilidadPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RentabilidadContent />
    </Suspense>
  )
}

async function RentabilidadContent() {
  const data = await getRentabilidadData()
  return <RentabilidadClient {...data} />
}
