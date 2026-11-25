"use client"

import { useState } from 'react'
import { seedDatabase } from '@/actions/seed'

export default function SeedPage() {
  const [status, setStatus] = useState('Click the button to seed the database.')

  const handleSeed = async () => {
    setStatus('Seeding...')
    const res = await seedDatabase()
    if (res.success) {
      setStatus('✅ Database Seeded Successfully! You can go to /artisans now.')
    }
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Database Seeder</h1>
      <p>{status}</p>
      <button 
        onClick={handleSeed}
        style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
      >
        Seed Dummy Artisans
      </button>
    </div>
  )
}
