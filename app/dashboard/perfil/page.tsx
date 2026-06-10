import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/erp/layout/PageHeader'
import { PerfilClient } from './client'
import type { UserProfile } from '@/lib/erp/types'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  return (
    <div>
      <PageHeader title="Mi Perfil" subtitle="Información de tu cuenta y configuración" />
      <PerfilClient profile={profile as UserProfile} />
    </div>
  )
}
