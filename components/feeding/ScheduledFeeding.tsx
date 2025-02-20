'use client'

import { FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useMediaQuery } from '@/hooks/use-media-query'

import AmountSelector from '@/components/inputs/AmountSelector'
import CustomCard from '@/components/CustomCard'
import DaySelector from '@/components/inputs/DaySelector'
import TimePicker from '@/components/inputs/TimePicker'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
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
import ScheduleCard from './ScheduleCard'
import useAuth from '@/hooks/useAuth'
import { Schedule } from './types'

export default function ScheduledFeeding() {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [time, setTime] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [userSchedules, setUserSchedules] = useState<Schedule[]>([])
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetch(`/api/schedules/user/${user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load user schedules')
          }

          return response.json()
        })
        .then((data) => {
          setUserSchedules(data[0].schedule)
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          })
        })
    }
  }, [user, toast])

  const handleSubmit = async () => {
    try {
      if (selectedDays.length === 0 || time === '') {
        throw new Error(
          'Please select days and a time for the feeding schedule'
        )
      }

      if (amount < 1 || amount > 50) {
        throw new Error('Please enter a valid feeding amount')
      }

      const newEntry = {
        days: selectedDays,
        time: time,
        feedingAmount: amount,
      }

      const response = await fetch(`/api/schedules/user/${user?.email}`)

      if (response.status === 404) {
        fetch('/api/schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: user?.email,
            schedule: [newEntry],
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Failed to create schedule')
          }
        })
      } else {
        const userSchedules = await response.json()
        const existingSchedules = userSchedules[0]?.schedule

        const hasOverlap = (existingDays: string[], newDays: string[]) => {
          return newDays.some((day) => existingDays.includes(day))
        }

        const isDuplicate = existingSchedules.some((schedule: Schedule) => {
          const existingDays = schedule.days.sort()
          const newDaysSorted = newEntry.days.sort()

          return (
            schedule.time === newEntry.time &&
            hasOverlap(existingDays, newDaysSorted)
          )
        })

        if (isDuplicate) {
          toast({
            title: 'Schedule Conflict',
            description:
              'A schedule already exists for one or more selected days at this time.',
            variant: 'destructive',
          })
          return
        }

        const updatedSchedule = [...userSchedules[0].schedule, newEntry]

        fetch(`/api/schedules/user/${user?.email}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ schedule: updatedSchedule }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update schedule')
          }
        })
      }

      toast({
        title: 'Schedule Updated',
        description: 'Your feeding schedule has been updated.',
      })

      // After adding new schedule, append it to userSchedules and close menu
      setUserSchedules((prev) => [...prev, newEntry])
      setIsOpen(false)
      setSelectedDays([])
      setTime('')
      setAmount(0)
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  const handleDeletion = async (index: number) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'User not found',
        variant: 'destructive',
      })
      return
    }

    const updatedSchedules = [...userSchedules]
    updatedSchedules.splice(index, 1)

    fetch(`/api/schedules/user/${user.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedule: updatedSchedules }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the schedule')
        }

        setUserSchedules(updatedSchedules)
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      })
  }

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
    <CustomCard cardTitle="Scheduled Feeding">
      <CardContent>
        <div className="flex flex-col gap-4">
          {userSchedules?.map((schedule: Schedule, index: number) => (
            <ScheduleCard
              key={index}
              days={schedule.days}
              time={schedule.time}
              amount={`${schedule.feedingAmount} oz`}
              idx={index}
              handleDeletion={handleDeletion}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <DialogDrawer open={isOpen} onOpenChange={setIsOpen}>
          <DialogDrawerTrigger asChild>
            <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] text-xl h-12 w-full">
              <FaPlus />
            </Button>
          </DialogDrawerTrigger>
          <DialogDrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DialogDrawerHeader>
                <DialogDrawerTitle>New Schedule</DialogDrawerTitle>
                <DialogDrawerDescription>
                  Create a new feeding schedule.
                </DialogDrawerDescription>
              </DialogDrawerHeader>
              <div className="flex flex-col p-4 gap-5">
                <DaySelector
                  selectedDays={selectedDays}
                  setSelectedDays={setSelectedDays}
                />
                <TimePicker time={time} setTime={setTime} />
                <AmountSelector amount={amount} setAmount={setAmount} />
              </div>
            </div>
            <DialogDrawerFooter>
              <Button
                onClick={handleSubmit}
                className="hover:bg-[#DA8359] text-md h-12"
              >
                Save Schedule
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
      </CardFooter>
    </CustomCard>
  )
}
