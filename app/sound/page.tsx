import NavBar from '@/components/NavBar'
import SoundPreferences from '@/components/sound/SoundPreferences'
import Image from 'next/image'

export default function SoundPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#433D8B] to-[#17153B] min-h-screen pb-8">
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
