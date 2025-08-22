'use client'

import { createContext } from 'react'
import { defaultUser } from '../reducers/UserReducer'
import { User } from '@/types'

const UserContext = createContext<{ user: User }>({ user: defaultUser })

export default UserContext
