'use client'

import useAuth from '@/hooks/useAuth'
import NavBar from '@/components/NavBar'
import ManualFeeding from '@/components/feeding/ManualFeeding'
import ScheduledFeeding from '@/components/feeding/ScheduledFeeding'

export default function FeedingPage() {
  useAuth()

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen pb-12 md:pb-0">
      <NavBar title="Feeding" />
      <div className="flex flex-col flex-grow gap-5 px-5 py-5 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <ManualFeeding />
        <ScheduledFeeding />
      </div>
    </div>
  )
}
