import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (typeof window !== 'undefined') {
    console.log('[supabase] url:', url.substring(0, 30))
    console.log('[supabase] key:', key.substring(0, 20))
  }
  return createBrowserClient(url, key)
}
