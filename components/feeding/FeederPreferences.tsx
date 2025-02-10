'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useToast } from '@/hooks/use-toast'
import useAuth from '@/hooks/useAuth'

import CustomCard from '@/components/CustomCard'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
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
import { convertToAMPM, capitalizeDays, sortDaysOfWeek } from '@/lib/utils'
import { Schedule } from './types'

export default function FeederPreferences() {
  const [isOpen, setIsOpen] = useState(false)
  const [userSchedules, setUserSchedules] = useState<Schedule[]>([])
  const [manualFeedingAmount, setManualFeedingAmount] = useState<string | null>(
    null
  )
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    if (user?.email) {
      const fetchSchedules = async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/api/schedules/user/${user.email}`
          )
          if (response.ok) {
            const data = await response.json()
            setUserSchedules(data[0]?.schedule || [])
          } else {
            setUserSchedules([])
          }
        } catch (error) {
          console.error('Error fetching schedules:', error)
          toast({
            title: 'Error',
            description: 'Failed to load schedules.',
            variant: 'destructive',
          })
        }
      }
      fetchSchedules()
    }
  }, [user?.email, toast])

  useEffect(() => {
    if (user?.email) {
      const fetchManualFeedingAmount = async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/api/manualFeedings/user/${user.email}`
          )
          if (response.ok) {
            const data = await response.json()
            setManualFeedingAmount(data.manualFeedingAmount || 'Not set.')
          } else {
            setManualFeedingAmount('Not set.')
          }
        } catch (error) {
          console.error('Error fetching manual feeding amount:', error)
          toast({
            title: 'Error',
            description: 'Failed to load manual feeding amount.',
            variant: 'destructive',
          })
        }
      }
      fetchManualFeedingAmount()
    }
  }, [user?.email, toast])

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
    <div>
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
              <CustomCard
                cardTitle="Manual Feeding Amount"
                cardDescription={manualFeedingAmount || 'Loading...'}
              />
              <CustomCard cardTitle="Scheduled Feeding">
                <CardContent className="max-h-40 overflow-y-auto">
                  {userSchedules.length > 0 ? (
                    <div className="space-y-2">
                      {userSchedules.map((schedule, index) => (
                        <p key={index} className="leading-none">
                          {convertToAMPM(schedule.time)} -{' '}
                          {schedule.feedingAmount} oz.
                          <br />
                          {schedule.days.length === 7
                            ? 'Every Day'
                            : capitalizeDays(sortDaysOfWeek(schedule.days))}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No scheduled feedings.</p>
                  )}
                </CardContent>
              </CustomCard>
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
