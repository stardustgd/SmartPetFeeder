'use client'

import { FaPlus } from 'react-icons/fa'
import { useState, useContext } from 'react'
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
import UserContext from '@/src/contexts/UserContext'

export default function ScheduledFeeding() {
  const { user } = useContext(UserContext)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [time, setTime] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      if (selectedDays.length === 0 || time === '') {
        throw new Error(
          'Please select days and a time for the feeding schedule'
        )
      }

      if (amount < 1 || amount > 120) {
        throw new Error(
          'Please enter a valid feeding amount between 1 and 120.'
        )
      }

      const newEntry = {
        days: selectedDays,
        time: time,
        feedingAmount: amount,
      }

      // After adding new schedule, append it to userSchedules and close menu
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

    // fetch(`/api/schedules/user/${user.email}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ schedule: updatedSchedules }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Failed to delete the schedule')
    //     }
    //
    //     setUserSchedules(updatedSchedules)
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: 'Error',
    //       description: error.message,
    //       variant: 'destructive',
    //     })
    //   })
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
          {user.schedules?.map((schedule) => (
            <ScheduleCard
              key={schedule._id}
              days={schedule.days}
              time={schedule.time}
              amount={`${schedule.amount} ${Number(schedule.amount) === 1 ? 'gram' : 'grams'}`}
              idx={Number(schedule._id)}
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
