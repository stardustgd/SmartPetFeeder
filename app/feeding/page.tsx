'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import CustomCard from '@/components/ui/CustomCard'
import DaySelector from '@/components/ui/DaySelector'
import NavBar from '@/components/ui/NavBar'
import TimePicker from '@/components/ui/TimePicker'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
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
import { FaPlus } from 'react-icons/fa'

export default function FeedingPage() {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [time, setTime] = useState<string>('')
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
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

      setIsDrawerOpen(false)
      setSelectedDays([])
      setTime('')
    }
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar showArrow={true} title="Feeding" />
      <div className="flex flex-col flex-grow gap-5 px-5 py-5 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <CustomCard cardTitle="Manual Feeding Amount" cardDescription="1 Cup" />
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
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] text-xl h-12 w-full">
                  <FaPlus />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>New Schedule</DrawerTitle>
                    <DrawerDescription>
                      Create a new feeding schedule.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex flex-col p-4 gap-5">
                    <DaySelector
                      selectedDays={selectedDays}
                      setSelectedDays={setSelectedDays}
                    />
                    <TimePicker time={time} setTime={setTime} />
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={handleSubmit}>Save Schedule</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardFooter>
        </CustomCard>
      </div>
    </div>
  )
}
