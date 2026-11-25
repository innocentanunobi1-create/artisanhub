"use server"

import { createClient } from '@/lib/supabase-server'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (user) {
    return { success: true, role: user.user_metadata?.role }
  }
  
  return { error: 'Unknown error occurred' }
}
