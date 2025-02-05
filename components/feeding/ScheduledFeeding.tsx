'use client'

import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
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

export default function ScheduledFeeding() {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [time, setTime] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()

  const handleSubmit = () => {
    if (selectedDays.length === 0 || time === '') {
      toast({
        title: 'Schedule Error',
        description: 'Please select days and a time for the feeding schedule',
        variant: 'destructive',
      })
    } else if (amount < 1 || amount > 50) {
      toast({
        title: 'Schedule Error',
        description: 'Please enter a valid feeding amount',
        variant: 'destructive',
      })
    } else {
      const newSchedule = {
        days: selectedDays,
        time: time,
        feedingAmount: amount,
      }

      const scheduleJson = JSON.stringify(newSchedule)

      console.log(scheduleJson)

      // Send to backend when implemented

      toast({
        title: 'Schedule Saved',
        description: 'Feeding schedule has been saved.',
      })

      setIsOpen(false)
      setSelectedDays([])
      setTime('')
      setAmount(0)
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
          <ScheduleCard days="every day" time="12:00pm" amount="3 oz" />
          <ScheduleCard days="every day" time="12:00pm" amount="3 oz" />
          <ScheduleCard days="every day" time="12:00pm" amount="3 oz" />
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
