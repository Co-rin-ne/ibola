'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || '',
            loyalty_points: data.user.user_metadata?.loyalty_points || 0,
            created_at: data.user.created_at || '',
            updated_at: data.user.updated_at || '',
          })
        }
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          loyalty_points: session.user.user_metadata?.loyalty_points || 0,
          created_at: session.user.created_at || '',
          updated_at: session.user.updated_at || '',
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      data?.subscription?.unsubscribe()
    }
  }, [])

  return { user, isLoading }
}
