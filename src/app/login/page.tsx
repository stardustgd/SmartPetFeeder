'use client'

import LoginForm from '@/components/auth/LoginForm'

import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      window.location.reload()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <>
      <NavBar title="Login" />
      <Button
        onClick={logout}
        className="absolute top-4 right-4 border-2 border-white hover:bg-[#dea15f]"
      >
        Sign Out
      </Button>
      <LoginForm />
    </>
  )
}
