import NavBar from '@/components/NavBar'
import FeedButton from '@/components/FeedButton'
import FeederPreferences from '@/components/feeding/FeederPreferences'

export default function Home() {
  return (
    <div className="flex flex-col bg-linear-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar />
      <FeedButton />
      <FeederPreferences />
    </div>
  )
}
