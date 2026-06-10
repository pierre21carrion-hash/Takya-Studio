import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { getUsers } from '@/app/actions/usuarios'
import { EquipoClient } from './client'
import type { UserProfile } from '@/lib/erp/types'

export default async function EquipoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('rol').eq('id', user.id).single()
  const isCeo = profile?.rol === 'ceo'

  const users = await getUsers()

  return (
    <div>
      <PageHeader title="Gestión de Equipo" subtitle="Administra los miembros, roles y accesos del equipo" />
      <EquipoClient
        users={users as UserProfile[]}
        currentUserId={user.id}
        isCeo={isCeo}
      />
    </div>
  )
}
