"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from './Button'

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) setUser(session.user)
    }
    checkUser()
  }, [supabase])

  return (
    <nav style={{
      background: 'rgba(3, 7, 18, 0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '20px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px', textShadow: '0 0 20px rgba(16,185,129,0.5)' }}>
          Artisan<span style={{ color: 'var(--color-primary)' }}>Hub</span>
        </Link>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontWeight: 600 }}>
          <Link href="/artisans" style={{ transition: '0.3s', color: '#fff' }}>Find Artisans</Link>
          
          {user ? (
            <Button href="/customer-dashboard" variant="primary" style={{ padding: '12px 24px' }}>Dashboard</Button>
          ) : (
            <>
              <Link href="/login" style={{ color: 'var(--color-text-muted)', marginRight: '10px' }}>Log In</Link>
              <Button href="/register" variant="primary" style={{ padding: '12px 24px' }}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
