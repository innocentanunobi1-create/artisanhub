export const instant = false

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function ArtisanDashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  return (
    <div className="container" style={{ padding: '50px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem' }}>Artisan Dashboard: {profile?.full_name}</h1>
        <form action="/auth/signout" method="post">
          <button 
            type="submit"
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'transparent', 
              color: 'var(--color-error)', 
              border: '1px solid var(--color-error)',
              borderRadius: 'var(--border-radius)',
              fontWeight: 600
            }}
          >
            Log Out
          </button>
        </form>
      </div>
      
      <p style={{ color: 'var(--color-text-muted)' }}>
        This is your secure dashboard. Here you will manage your bookings and profile.
      </p>
    </div>
  )
}
