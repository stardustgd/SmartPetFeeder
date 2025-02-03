'use client'

import { IoTrash } from 'react-icons/io5'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useMediaQuery } from '@/hooks/use-media-query'

import { Button } from '@/components/ui/button'
import { Card } from '../ui/card'
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

type ScheduleCardProps = {
  days: string
  time: string
  amount: string
}

export default function ScheduleCard({
  days,
  time,
  amount,
}: ScheduleCardProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleDeletion = () => {
    toast({
      title: 'Schedule Deleted',
      description: 'Feeding schedule has been deleted',
    })

    // Handle deletion in backend here

    setIsOpen(false)
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
    <Card className="w-full max-w-3xl mx-auto">
      <div className="flex flex-row items-center justify-between py-6 px-4">
        <div className="flex flex-col">
          <h1 className="text-2xl">{time}</h1>
          <h1>
            {amount}, {days}
          </h1>
        </div>
        <DialogDrawer open={isOpen} onOpenChange={setIsOpen}>
          <DialogDrawerTrigger asChild>
            <div className="cursor-pointer">
              <IoTrash className="size-6 " />
            </div>
          </DialogDrawerTrigger>
          <DialogDrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DialogDrawerHeader>
                <DialogDrawerTitle>Delete Schedule</DialogDrawerTitle>
                <DialogDrawerDescription>
                  Are you sure you want to delete this schedule?
                </DialogDrawerDescription>
              </DialogDrawerHeader>
              <div className="md:pt-8">
                <DialogDrawerFooter>
                  <Button
                    onClick={handleDeletion}
                    className="bg-[#da5959] hover:bg-[#bf4949] text-md h-12"
                  >
                    Delete Schedule
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
              </div>
            </div>
          </DialogDrawerContent>
        </DialogDrawer>
      </div>
    </Card>
  )
}
