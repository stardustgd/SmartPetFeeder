import { Dispatch } from 'react'

export interface iUserContext {
  user: User
  userDispatch: Dispatch<UserAction>
}

export interface User {
  id: string
  name: string
  email: string
  schedules: Schedule[]
  preferences: Preferences
}

export type UserAction = {
  type: string
  payload: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Preferences {
  manualFeedingAmount: number
  unit: string
}

export interface Schedule {
  _id: string
  userId: string
  days: string[]
  time: string
  amount: number
}
