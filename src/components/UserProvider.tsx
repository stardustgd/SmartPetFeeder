'use client'

import { useReducer, useEffect } from 'react'
import UserContext from '@/contexts/UserContext'
import { defaultUser, userReducer } from '@/reducers/UserReducer'
import { SET_USER_DATA } from '../reducers/actionTypes'
import { useUser } from '../hooks/useUser'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = useReducer(userReducer, defaultUser)
  const { data } = useUser()

  useEffect(() => {
    if (data) {
      userDispatch({
        type: SET_USER_DATA,
        payload: data,
      })
    }
  }, [data])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
