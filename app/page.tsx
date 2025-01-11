'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import CustomCard from '@/components/CustomCard'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

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
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="bg-transparent shadow-none h-24 w-full">
              Open Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Feeder Settings</DrawerTitle>
                <DrawerDescription>
                  Set your feeding preferences.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col p-4 gap-5">
                <CustomCard
                  cardTitle="Manual Feeding Amount"
                  cardDescription="1 Cup"
                />
                <CustomCard cardTitle="Scheduled Feeding">
                  <CardContent>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
                      <div className="space-y-2">
                        <p className="leading-none">
                          9:00 AM, Daily, 1 Serving
                        </p>
                        <p className="leading-none">
                          9:00 AM, Daily, 1 Serving
                        </p>
                        <p className="leading-none">
                          9:00 AM, Daily, 1 Serving
                        </p>
                        <p className="leading-none">
                          9:00 AM, Daily, 1 Serving
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </CustomCard>
              </div>
            </div>
            <DrawerFooter className="mx-auto w-full max-w-sm">
              <Button
                asChild
                className="bg-[#F7BE7A] hover:bg-[#DA8359] text-xl h-12"
              >
                <Link href="/feeding">Edit Preferences</Link>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
