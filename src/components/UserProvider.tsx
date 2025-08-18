'use client'

import { useContext, useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/contexts/UserContext'
import { userReducer } from '@/reducers/UserReducer'
import { User } from '@/types'

export const defaultUser: User = {
  id: '',
  name: '',
  email: '',
  schedules: [],
  preferences: {
    manualFeedingAmount: -1,
    unit: '',
  },
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, defaultUser)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/currentUser')
      .then((response) => {
        if (response.status === 401) {
          router.push('/login')
        }

        response.json()
      })
      .then((data) => {
        console.log(data)
        dispatch({ type: 'SET_USER', payload: data })
      })

    fetch('/api/schedules')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_SCHEDULES', payload: data })
      })
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
