export type Schedule = {
  days: string[]
  time: string
  feedingAmount: number
}

export type ManualFeeding = {
  user: string
  manualFeedingAmount: number
}
