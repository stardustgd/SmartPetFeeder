export interface User {
  id: string
  name: string
  email: string
  schedules: Schedule[]
  preferences: Preferences
}

export type UserAction = {
  type: string
  payload: any // TODO: fix any type
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
