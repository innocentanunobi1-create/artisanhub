"use server"

import { createClient } from '@/lib/supabase-server'

export async function seedDatabase() {
  const supabase = await createClient()

  // These are dummy UUIDs and emails just for testing
  const dummyData = [
    { id: '11111111-1111-1111-1111-111111111111', email: 'john@plumber.com', full_name: 'John Okafor', role: 'artisan', headline: 'Expert Plumber', bio: '15 years experience in residential plumbing.', category: 'Plumbing', price: 5000 },
    { id: '22222222-2222-2222-2222-222222222222', email: 'emeka@electric.com', full_name: 'Emeka Nwosu', role: 'artisan', headline: 'Certified Electrician', bio: 'Specializing in residential wiring and generator repair.', category: 'Electrical', price: 8000 },
    { id: '33333333-3333-3333-3333-333333333333', email: 'tunde@carpenter.com', full_name: 'Tunde Adebayo', role: 'artisan', headline: 'Master Carpenter', bio: 'Custom furniture and home renovations.', category: 'Carpentry', price: 10000 },
    { id: '44444444-4444-4444-4444-444444444444', email: 'grace@painter.com', full_name: 'Grace Peters', role: 'artisan', headline: 'Interior Painter', bio: 'Bringing color and life to your walls.', category: 'Painting', price: 6000 },
    { id: '55555555-5555-5555-5555-555555555555', email: 'david@acrepair.com', full_name: 'David Musa', role: 'artisan', headline: 'AC Technician', bio: 'Installation, servicing, and repair of all AC brands.', category: 'AC Repair', price: 7000 },
  ]

  // 1. Insert into public.profiles
  for (const item of dummyData) {
    await supabase.from('profiles').upsert({
      id: item.id,
      email: item.email,
      full_name: item.full_name,
      role: item.role as any,
    })

    // 2. Insert into artisan_profiles
    await supabase.from('artisan_profiles').upsert({
      user_id: item.id,
      headline: item.headline,
      bio: item.bio,
      verification_status: 'approved',
      is_available: true,
      average_rating: 4.8, // Fake rating for UI display
      review_count: 12,
      starting_price_ngn: item.price
    })
  }

  return { success: true }
}
