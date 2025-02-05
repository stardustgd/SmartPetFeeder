'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useMediaQuery } from '@/hooks/use-media-query'

import CustomCard from '@/components/CustomCard'
import { Button } from '@/components/ui/button'
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
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function ManualFeeding() {
  const [displayAmount, setDisplayAmount] = useState(1)
  const [amount, setAmount] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()

  const handleSubmit = () => {
    const newFeedingAmount = {
      manualFeedingAmount: displayAmount,
    }

    const amountJson = JSON.stringify(newFeedingAmount)

    console.log(amountJson)

    // Send to backend when implemented

    toast({
      title: 'Manual Feeding Amount Updated',
      description: 'Your preferences have been updated',
    })

    setAmount(displayAmount)
    setIsOpen(false)
  }

  const onClick = (adjustment: number) => {
    setDisplayAmount(Math.max(1, Math.min(50, displayAmount + adjustment)))
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
    <DialogDrawer open={isOpen} onOpenChange={setIsOpen}>
      <DialogDrawerTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer">
          <CustomCard
            cardTitle="Manual Feeding Amount"
            cardDescription={amount > 1 ? `${amount} ounces` : '1 ounce'}
          />
        </div>
      </DialogDrawerTrigger>
      <DialogDrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DialogDrawerHeader>
            <DialogDrawerTitle>Manual Feeding Amount</DialogDrawerTitle>
            <DialogDrawerDescription>
              Set your manual feeding amount
            </DialogDrawerDescription>
          </DialogDrawerHeader>
          <div className="p-4 gap-5">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={displayAmount <= 1}
              >
                <FaMinus />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-semibold tracking-lighter">
                  {displayAmount}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  ounces
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={displayAmount >= 50}
              >
                <FaPlus />
              </Button>
            </div>
          </div>
        </div>
        <DialogDrawerFooter>
          <Button
            onClick={handleSubmit}
            className="hover:bg-[#DA8359] text-md h-12"
          >
            Save Changes
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
  )
}
