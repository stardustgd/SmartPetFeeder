import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToAMPM(militaryTime: string) {
  const [hours, minutes] = militaryTime.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const adjustedHours = hours % 12
  const displayHours = adjustedHours === 0 ? 12 : adjustedHours
  const formattedTime = `${displayHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`
  return formattedTime
}

export function capitalizeDays(days: string[]) {
  return days
    .map((day) => {
      return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
    })
    .join(', ')
}

export function sortDaysOfWeek(days: string[]) {
  const dayOrder = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  return days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
}
