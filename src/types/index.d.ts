export interface User {
  id: string
  name: string
  email: string
  schedules: Schedule[]
  preferences: Preferences
}

export type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_SCHEDULES'; payload: User['schedules'] }

export interface Preferences {
  manualFeedingAmount: number
  unit: string
}

export interface Schedule {
  id: string
  userId: string
  days: string[]
  time: string
  amount: number
}
