import LoginForm from '@/components/auth/LoginForm'

import NavBar from '@/components/NavBar'
import { verifyAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  // TODO: handle logout
  // const logout = async () => {
  //   try {
  //     await fetch('/api/auth/logout', {
  //       method: 'POST',
  //       credentials: 'include',
  //     })
  //
  //     window.location.reload()
  //   } catch (error) {
  //     console.error('Error logging out:', error)
  //   }
  // }

  // Check if user is already signed in
  const user = await verifyAuthToken()

  if (user) redirect('/')

  return (
    <>
      <NavBar title="Login" />
      {/* <Button */}
      {/*   onClick={logout} */}
      {/*   className="absolute top-4 right-4 border-2 border-white hover:bg-[#dea15f]" */}
      {/* > */}
      {/*   Sign Out */}
      {/* </Button> */}
      <LoginForm />
    </>
  )
}
