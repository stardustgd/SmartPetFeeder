import NavBar from '@/components/NavBar'
import RegisterForm from '@/components/auth/RegisterForm'
import { verifyAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function RegisterPage() {
  // Check if user is already signed in
  const user = await verifyAuthToken()
  if (user) redirect('/')

  return (
    <>
      <NavBar title="Register" />
      <RegisterForm />
    </>
  )
}
