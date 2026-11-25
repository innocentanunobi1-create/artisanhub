"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/Button'

const CATEGORIES = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'AC Repair', 'Cleaning', 'Generator Repair', 'Welding']

export default function Register() {
  const router = useRouter()
  const supabase = createClient()
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', role: 'customer' as 'customer' | 'artisan',
    category: 'Plumbing', headline: '', bio: '', price: 5000
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email, password: formData.password,
      options: { data: { full_name: formData.fullName, role: formData.role } }
    })

    if (authError) { setError(authError.message); setLoading(false); return }

    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert([{ id: authData.user.id, email: formData.email, full_name: formData.fullName, role: formData.role }])
      if (profileError) { setError(`Profile Error: ${profileError.message}`); setLoading(false); return }

      if (formData.role === 'artisan') {
        const { error: artisanError } = await supabase.from('artisan_profiles').insert([{ user_id: authData.user.id, headline: formData.headline, bio: formData.bio, starting_price_ngn: formData.price, verification_status: 'pending' }])
        if (artisanError) { setError(`Artisan Details Error: ${artisanError.message}`); setLoading(false); return }
      }
    }

    await supabase.auth.signOut()
    
    // Show the 3D animation, then redirect
    setIsSuccess(true)
    setTimeout(() => {
      router.push('/login')
    }, 2800)
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
        <h1 className="success-text">Account Created</h1>
        <p style={{ marginTop: '20px', color: '#A1A1AA', letterSpacing: '2px' }}>REDIRECTING TO LOGIN...</p>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '550px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', textAlign: 'center', color: '#FFF' }}>Create Account</h1>
        
        {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid #EF4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label className="auth-label">I am a...</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setFormData({...formData, role: 'customer'})} style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: formData.role === 'customer' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', color: formData.role === 'customer' ? 'var(--color-primary)' : '#FFF', border: formData.role === 'customer' ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)', fontWeight: 600, transition: 'all 0.3s' }}>Customer</button>
              <button type="button" onClick={() => setFormData({...formData, role: 'artisan'})} style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: formData.role === 'artisan' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', color: formData.role === 'artisan' ? 'var(--color-primary)' : '#FFF', border: formData.role === 'artisan' ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)', fontWeight: 600, transition: 'all 0.3s' }}>Artisan</button>
            </div>
          </div>

          <div>
            <label className="auth-label">Full Name</label>
            <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="auth-input" placeholder="John Doe" />
          </div>

          <div>
            <label className="auth-label">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="auth-input" placeholder="name@example.com" />
          </div>

          <div>
            <label className="auth-label">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="auth-input" placeholder="••••••••" />
          </div>

          {formData.role === 'artisan' && (
            <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <p style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--color-primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Professional Details</p>
              
              <div>
                <label className="auth-label">Service Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="auth-input">
                  {CATEGORIES.map(cat => <option key={cat} value={cat} style={{ color: '#000' }}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="auth-label">Headline (e.g. Expert Plumber)</label>
                <input type="text" required value={formData.headline} onChange={(e) => setFormData({...formData, headline: e.target.value})} className="auth-input" placeholder="Expert Plumber" />
              </div>

              <div>
                <label className="auth-label">Experience / Bio</label>
                <textarea required value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="auth-input" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="15 years experience in residential plumbing..." />
              </div>

              <div>
                <label className="auth-label">Starting Price (NGN)</label>
                <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})} className="auth-input" />
              </div>
            </div>
          )}

          <Button type="submit" fullWidth disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: '#A1A1AA' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
