'use client'

import { useReducer, useEffect } from 'react'
import UserContext from '@/contexts/UserContext'
import { defaultUser, userReducer } from '@/reducers/UserReducer'
import { SET_USER_DATA } from '../reducers/actionTypes'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = useReducer(userReducer, defaultUser)

  useEffect(() => {
    // TODO: use react query in the future
    const getCurrentUser = async () => {
      try {
        const currentUserResponse = await fetch('/api/auth/currentUser', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })

        if (!currentUserResponse.ok) {
          throw new Error('Failed to get current user')
        }

        const scheduleResponse = await fetch('/api/schedules', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })

        if (!scheduleResponse.ok) {
          throw new Error('Failed to get schedules')
        }

        const userData = await currentUserResponse.json()
        const scheduleData = await scheduleResponse.json()

        userDispatch({
          type: SET_USER_DATA,
          payload: {
            ...userData,
            schedules: scheduleData,
          },
        })
      } catch (err) {
        console.error(err)
      }
    }

    getCurrentUser()
  }, [])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
