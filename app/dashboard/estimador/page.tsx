import { Suspense } from 'react'
import { getEstimados } from '@/app/actions/rentabilidad'
import { EstimadorClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function EstimadorPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EstimadorContent />
    </Suspense>
  )
}

async function EstimadorContent() {
  const historial = await getEstimados()
  return <EstimadorClient historial={historial} />
}
