import NavBar from '@/components/NavBar'
import FeedButton from '@/components/FeedButton'
import FeederPreferences from '@/components/feeding/FeederPreferences'
import { verifyAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await verifyAuthToken()
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col bg-linear-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar />
      <FeedButton />
      <FeederPreferences />
    </div>
  )
}
