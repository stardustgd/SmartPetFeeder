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
    if (user?.email) {
      const fetchSchedules = async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/api/schedules/user/${user?.email}`
          )

          if (response.ok) {
            const data = await response.json()
            setUserSchedules(data[0]?.schedule || null)
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

  const handleSubmit = async () => {
    if (selectedDays.length === 0 || time === '') {
      toast({
        title: 'Schedule Error',
        description: 'Please select days and a time for the feeding schedule',
        variant: 'destructive',
      })
      return
    }

    if (amount < 1 || amount > 50) {
      toast({
        title: 'Schedule Error',
        description: 'Please enter a valid feeding amount',
        variant: 'destructive',
      })
      return
    }

    const newEntry = {
      days: selectedDays,
      time: time,
      feedingAmount: amount,
    }

    try {
      const response = await fetch(
        `http://localhost:5050/api/schedules/user/${user?.email}`
      )

      if (response.status === 404) {
        const createResponse = await fetch(
          'http://localhost:5050/api/schedules',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: user?.email,
              schedule: [newEntry],
            }),
          }
        )

        if (!createResponse.ok) {
          toast({
            title: 'Schedule Error',
            description: 'Failed to create schedule',
            variant: 'destructive',
          })
          return
        }

        toast({
          title: 'Schedule Created',
          description: 'A new feeding schedule has been added.',
        })
      } else {
        const userSchedules = await response.json()

        let isDuplicate = false
        for (let i = 0; i < userSchedules[0].schedule.length; i++) {
          const schedule = userSchedules[0].schedule[i]

          if (
            JSON.stringify(schedule.days.sort()) ===
              JSON.stringify(newEntry.days) &&
            schedule.time === newEntry.time
          ) {
            isDuplicate = true
            break
          }
        }

        if (isDuplicate) {
          toast({
            title: 'Duplicate Schedule',
            description:
              'A feeding schedule for this day and time already exists.',
            variant: 'destructive',
          })
          return
        }

        const updatedSchedule = [...userSchedules[0].schedule, newEntry]

        const updateResponse = await fetch(
          `http://localhost:5050/api/schedules/user/${user?.email}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ schedule: updatedSchedule }),
          }
        )

        if (!updateResponse.ok) {
          toast({
            title: 'Schedule Error',
            description: 'Failed to update schedule',
            variant: 'destructive',
          })
          return
        }

        toast({
          title: 'Schedule Updated',
          description: 'Your feeding schedule has been updated.',
        })
      }

      const updatedSchedulesResponse = await fetch(
        `http://localhost:5050/api/schedules/user/${user?.email}`
      )
      if (updatedSchedulesResponse.ok) {
        const updatedSchedulesData = await updatedSchedulesResponse.json()
        setUserSchedules(updatedSchedulesData[0]?.schedule || [])
      }
    } catch (err) {
      console.error('Error:', err)
      toast({
        title: 'Error',
        description: 'Something went wrong while saving the schedule.',
        variant: 'destructive',
      })
    }

    setIsOpen(false)
    setSelectedDays([])
    setTime('')
    setAmount(0)
  }

  const handleDeletion = async (index: number) => {
    try {
      const updatedSchedules = [...userSchedules]
      updatedSchedules.splice(index, 1)

      const response = await fetch(
        `http://localhost:5050/api/schedules/user/${user?.email}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ schedule: updatedSchedules }),
        }
      )

      if (!response.ok) {
        toast({
          title: 'Deletion Failed',
          description: 'Failed to delete the schedule.',
          variant: 'destructive',
        })
        return
      }

      setUserSchedules(updatedSchedules)
      toast({
        title: 'Schedule Deleted',
        description: 'Feeding schedule has been deleted.',
      })
    } catch (error) {
      console.error('Error deleting schedule:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete schedule.',
        variant: 'destructive',
      })
    }
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
          {userSchedules?.map((schedule: any, index: number) => (
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
