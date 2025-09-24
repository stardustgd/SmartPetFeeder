import { useQuery } from '@tanstack/react-query'

async function fetchUser() {
  const res = await fetch('/api/auth/currentUser', {
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Not authenticated')

  return res.json()
}

async function fetchSchedules() {
  const res = await fetch('/api/schedules', {
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch schedules')
  return res.json()
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await fetchUser()
      const schedules = await fetchSchedules()
      return { ...user, schedules }
    },
    retry: false,
  })
}
