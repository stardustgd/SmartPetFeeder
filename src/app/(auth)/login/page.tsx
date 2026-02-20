import LoginForm from '@/components/auth/LoginForm'

import NavBar from '@/components/NavBar'
import { verifyAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  // Check if user is already signed in
  const user = await verifyAuthToken()

  if (user) redirect('/')

  return (
    <>
      <NavBar title="Login" />
      <LoginForm />
    </>
  )
}
