'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

import CustomCard from '@/components/CustomCard'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'

import { useContext } from 'react'
import UserContext from '@/contexts/UserContext'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { convertToAMPM } from '@/lib/utils'
import { Schedule } from '@/types'

export default function FeederPreferences() {
  const { user } = useContext(UserContext)

  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  // const { toast } = useToast()

  const DialogDrawer = isDesktop ? Dialog : Drawer
  const DialogDrawerTrigger = isDesktop ? DialogTrigger : DrawerTrigger
  const DialogDrawerContent = isDesktop ? DialogContent : DrawerContent
  const DialogDrawerHeader = isDesktop ? DialogHeader : DrawerHeader
  const DialogDrawerTitle = isDesktop ? DialogTitle : DrawerTitle
  const DialogDrawerFooter = isDesktop ? DialogFooter : DrawerFooter
  const DialogDrawerClose = isDesktop ? DialogClose : DrawerClose
  const DialogDrawerDescription = isDesktop
    ? DialogDescription
    : DrawerDescription

  return (
    <div className="w-full bottom-0 absolute pb-16 md:pb-0">
      <DialogDrawer open={isOpen} onOpenChange={setIsOpen}>
        <DialogDrawerTrigger asChild>
          <Button className="bg-transparent shadow-none h-24 w-full">
            Open Drawer
          </Button>
        </DialogDrawerTrigger>
        <DialogDrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DialogDrawerHeader>
              <DialogDrawerTitle>Feeder Preferences</DialogDrawerTitle>
              <DialogDrawerDescription>
                Set your feeding preferences.
              </DialogDrawerDescription>
            </DialogDrawerHeader>
            <div className="flex flex-col p-4 gap-5">
              <ManualFeedingCard
                manualFeedingAmount={user.preferences.manualFeedingAmount}
                unit={user.preferences.unit}
              />
              <ScheduledFeedingCard
                schedules={user.schedules}
                unit={user.preferences.unit}
              />
            </div>
          </div>
          <DialogDrawerFooter className="mx-auto w-full max-w-sm">
            <Button asChild className="hover:bg-[#DA8359] text-md h-12">
              <Link href="/feeding">Edit Preferences</Link>
            </Button>
            <DialogDrawerClose asChild>
              <Button
                variant="outline"
                className="hover:bg-[#D9D9D9] text-md h-12"
              >
                Cancel
              </Button>
            </DialogDrawerClose>
          </DialogDrawerFooter>
        </DialogDrawerContent>
      </DialogDrawer>
    </div>
  )
}

function ManualFeedingCard({
  manualFeedingAmount,
  unit,
}: {
  manualFeedingAmount: number
  unit: string
}) {
  return (
    <CustomCard
      cardTitle="Manual Feeding Amount"
      cardDescription={`${manualFeedingAmount} ${unit}`}
    />
  )
}

function ScheduledFeedingCard({
  schedules,
  unit,
}: {
  schedules: Schedule[]
  unit: string
}) {
  return (
    <CustomCard cardTitle="Scheduled Feeding">
      <CardContent className="max-h-40 overflow-y-auto">
        <div className="space-y-2">
          {schedules.length === 0 ? (
            <p className="text-gray-500">No scheduled feedings.</p>
          ) : (
            schedules.map((schedule) => (
              <div key={schedule._id}>
                <p>{convertToAMPM(schedule.time)}</p>
                <p>
                  {schedule.amount} {unit}
                </p>
                <p>{schedule.days}</p>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </CustomCard>
  )
}
