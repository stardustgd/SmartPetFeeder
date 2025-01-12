'use client'

import { useState } from 'react'
import Image from 'next/image'

import NavBar from '@/components/NavBar'
import FeederPreferences from '@/components/feeding/FeederPreferences'

export default function Home() {
  const [isClicked, setIsClicked] = useState(false)
  const [showGif, setShowGif] = useState(true)

  const handleClick = () => {
    setIsClicked(true)

    setTimeout(() => {
      setShowGif(false)
    }, 2100)

    // Send to backend when implemented
    console.log('Feeder Clicked')
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar />
      <div className="h-full flex flex-col items-center justify-center grow mr-20">
        <div className="mb-52 z-10">
          <Image
            src="/feeder.png"
            width={350}
            height={350}
            alt="Pet Feeder"
            onClick={handleClick}
          />
        </div>
        <div className="absolute mb-48">
          <Image src="/bowl.png" width={350} height={350} alt="Pet Bowl" />
        </div>
        {isClicked && (
          <div className="absolute mb-48">
            <Image
              src="/food_dispense.gif"
              width={350}
              height={350}
              alt="Dispensing animation"
              className={showGif ? 'block' : 'hidden'}
              priority
            />
            <Image
              src="/food_dispensed.png"
              width={350}
              height={350}
              alt="Dispensed food"
              className={`${showGif ? 'hidden' : 'block'}`}
              priority
            />
          </div>
        )}
      </div>
      <div className="bottom-0 pb-16 md:pb-0 w-full">
        <FeederPreferences />
      </div>
    </div>
  )
}
