'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

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

export default function FeederPreferences() {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

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
        <DialogDrawerFooter className="mx-auto w-full max-w-sm">
          <Button
            asChild
            className="hover:bg-[#DA8359] text-md h-12"
          >
            <Link href="/feeding">Edit Preferences</Link>
          </Button>
          <DialogDrawerClose asChild>
            <Button variant="outline" className="hover:bg-[#D9D9D9] text-md h-12">
              Cancel
            </Button>
          </DialogDrawerClose>
        </DialogDrawerFooter>
      </DialogDrawerContent>
    </DialogDrawer>
  )
}
