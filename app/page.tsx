import Link from 'next/link'
import NavBar from '@/components/ui/NavBar'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] h-screen">
      <NavBar />
      <div className="flex flex-col gap-3 px-5 py-5 w-screen h-[50vh] rounded-t-2xl bg-[#F2F2F2] text-black">
        <Link href="feeding/">
          <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] w-full">
            Feed
          </Button>
        </Link>
        <Link href="settings/">
          <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] w-full">
            Settings
          </Button>
        </Link>
        <Link href="sound/">
          <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] w-full">
            Sound
          </Button>
        </Link>
      </div>
    </div>
  )
}
