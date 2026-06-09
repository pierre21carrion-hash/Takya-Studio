import { Suspense } from 'react'
import { getLeads } from '@/app/actions/crm'
import { getUsers } from '@/app/actions/usuarios'
import { CRMClient } from './client'
import { PageSkeleton } from '@/components/erp/skeletons/PageSkeleton'

export default function CRMPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CRMContent />
    </Suspense>
  )
}

async function CRMContent() {
  const [leads, users] = await Promise.all([getLeads(), getUsers()])
  return <CRMClient leads={leads} users={users} />
}
