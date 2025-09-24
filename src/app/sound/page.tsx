import NavBar from '@/components/NavBar'
import SoundPreferences from '@/components/sound/SoundPreferences'
import { verifyAuthToken } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function SoundPage() {
  const user = await verifyAuthToken()
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col bg-linear-to-b from-[#433D8B] to-[#17153B] min-h-screen pb-8">
      <NavBar title="Sound" />
      <div className="h-full flex items-center justify-center grow">
        <div className="">
          <Image
            src="/vinyl.png"
            width={350}
            height={350}
            priority={true}
            alt="Vinyl Player"
          />
        </div>
        <div className="absolute">
          <Image
            src="/vinyl_stem.png"
            width={350}
            height={350}
            priority={true}
            alt="Vinyl Stem"
          />
        </div>
      </div>
      <SoundPreferences />
    </div>
  )
}
