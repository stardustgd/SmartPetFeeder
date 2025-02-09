import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type User = {
  email: string
  id: string
  iat: number
  exp: number
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          'http://localhost:5050/api/auth/current-user',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        )

        const data = await response.json()

        if (!data.loggedIn) {
          router.push('/login')
        } else {
          setUser(data.user)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  return { user, loading }
}

export default useAuth
