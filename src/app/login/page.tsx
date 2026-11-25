"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginAction } from '@/actions/auth'
import { Button } from '@/components/Button'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [role, setRole] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await loginAction(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.success) {
      setRole(result.role || 'customer')
      setIsSuccess(true)
      // Wait for the animation to finish before redirecting
      setTimeout(() => {
        router.push(role === 'artisan' ? '/artisan-dashboard' : '/customer-dashboard')
      }, 2800)
    }
  }

  if (isSuccess) {
    return (
      <div className="success-overlay">
        <div className="cube-container">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
        <h1 className="success-text">Access Granted</h1>
        <p style={{ marginTop: '20px', color: '#A1A1AA', letterSpacing: '2px' }}>INITIALIZING DASHBOARD...</p>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', textAlign: 'center', color: '#FFF' }}>Welcome Back</h1>
        <p style={{ color: '#A1A1AA', marginBottom: '30px', textAlign: 'center' }}>Log in to your ArtisanHub account</p>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid #EF4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="auth-label">Email</label>
            <input type="email" name="email" required className="auth-input" placeholder="name@example.com" />
          </div>

          <div>
            <label className="auth-label">Password</label>
            <input type="password" name="password" required className="auth-input" placeholder="••••••••" />
          </div>

          <Button type="submit" fullWidth disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Authenticating...' : 'Log In'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: '#A1A1AA' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
