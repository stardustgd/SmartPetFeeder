import CustomCard from '@/components/CustomCard'
import NavBar from '@/components/NavBar'
import ScheduledFeeding from '@/components/feeding/ScheduledFeeding'

export default function FeedingPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar title="Feeding" />
      <div className="flex flex-col flex-grow gap-5 px-5 py-5 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <CustomCard cardTitle="Manual Feeding Amount" cardDescription="1 Cup" />
        <ScheduledFeeding />
      </div>
    </div>
  )
}
