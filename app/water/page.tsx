'use client'

import Image from 'next/image'

import WaterPreferences from '@/components/water/WaterPreferences'
import NavBar from '@/components/NavBar'

export default function WaterPage() {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#53B1C9] to-[#394E92] min-h-screen pb-8">
      <NavBar title="Water" />
      <div className="h-full flex items-center justify-center grow">
        <Image
          src="/water.gif"
          width={350}
          height={350}
          alt="Water Button"
          onClick={handleClick}
        />
      </div>
      <WaterPreferences />
    </div>
  )
}
