import { User, UserAction } from '@/types'
import * as actions from './actionTypes'

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

export const userReducer = (state: User, action: UserAction): User => {
  switch (action.type) {
    case actions.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case actions.SET_USER_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      }

    default:
      return state
  }
}
