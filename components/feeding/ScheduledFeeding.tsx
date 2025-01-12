'use client'

import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useMediaQuery } from '@/hooks/use-media-query'

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

export default function ScheduledFeeding() {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [time, setTime] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()

  const handleSubmit = () => {
    if (selectedDays.length === 0 || time === '') {
      console.log('error')
      toast({
        title: 'Schedule Error',
        description: 'Please select days and a time for the feeding schedule.',
        variant: 'destructive',
      })
    } else {
      const newSchedule = {
        days: selectedDays,
        time: time,
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
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
          <div className="space-y-2">
            <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
            <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
            <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
            <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
          </div>
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
              </div>
            </div>
            <DialogDrawerFooter>
              <Button onClick={handleSubmit} className="hover:bg-[#DA8359] text-md h-12">
                Save Schedule
              </Button>
              <DialogDrawerClose asChild>
                <Button variant="outline" className="hover:bg-[#D9D9D9] text-md h-12">
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
