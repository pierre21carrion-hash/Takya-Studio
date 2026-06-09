import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/erp/layout/Sidebar'
import { TopNav } from '@/components/erp/layout/TopNav'
import { BottomNav } from '@/components/erp/layout/BottomNav'
import { ToastProvider } from '@/components/erp/ui/Toast'
import type { UserProfile } from '@/lib/erp/types'

export const metadata = {
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const typedProfile = profile as UserProfile

  return (
    /* ERP shell — fixed inset-0 z-[100] covers the public Navbar/Footer */
    <div
      className="erp-root fixed inset-0 flex flex-col"
      style={{ zIndex: 100, background: 'var(--color-bg, #E8E4DA)', overflow: 'hidden' }}
    >
      <TopNav user={typedProfile} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar user={typedProfile} />
        <main
          className="flex-1 overflow-y-auto"
          style={{ padding: '32px 40px 80px', background: 'var(--color-bg, #E8E4DA)' }}
        >
          <ToastProvider>
            {children}
          </ToastProvider>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
