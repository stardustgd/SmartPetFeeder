'use client'

import { useState } from 'react'
import Image from 'next/image'
import useAuth from '@/hooks/useAuth'

export default function FeedButton() {
  const [isClicked, setIsClicked] = useState(false)
  const [showGif, setShowGif] = useState(true)

  const { user } = useAuth()

  const handleClick = () => {
    setIsClicked(true)

    if (user) {
      fetch('/api/manualFeedings/trigger', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.email }),
      }).catch((error) => {
        console.error('Failed to trigger feeding button: ', error)
      })
    }

    setTimeout(() => {
      setShowGif(false)
    }, 2100)
  }

  return (
    <div className="h-fit flex flex-col items-center justify-center grow mr-20">
      <div className="mb-52 z-10">
        <Image
          src="/feeder.png"
          width={350}
          height={350}
          priority={true}
          alt="Pet Feeder"
          onClick={handleClick}
        />
      </div>
      <div className="absolute mb-48">
        <Image
          src="/bowl.png"
          width={350}
          height={350}
          priority={true}
          alt="Pet Bowl"
        />
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
  )
}
