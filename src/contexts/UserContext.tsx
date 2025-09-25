'use client'

import { createContext } from 'react'
import { defaultUser } from '../reducers/UserReducer'
import { iUserContext } from '@/types'

const UserContext = createContext<iUserContext>({
  user: defaultUser,
  userDispatch: () => {},
})

export default UserContext
