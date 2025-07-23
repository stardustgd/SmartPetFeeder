export interface User {
  id: number
  name: string
  email: string
  password: string
  preferences: UserPreferences
  feeding: boolean
}

export interface UserPreferences {
  manualFeedingAmount: number
  unit: string
}
