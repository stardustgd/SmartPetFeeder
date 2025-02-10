'use client'

import { FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useMediaQuery } from '@/hooks/use-media-query'

import CustomCard from '@/components/CustomCard'
import { CardContent, CardFooter } from '@/components/ui/card'
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
import AmountSelector from '@/components/inputs/AmountSelector'
import useAuth from '@/hooks/useAuth'

export default function ManualFeeding() {
  const [amount, setAmount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [userManualFeeding, setUserManualFeeding] = useState<any>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    if (user?.email) {
      const fetchManualFeeding = async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/api/manualFeedings/user/${user?.email}`
          )

          if (response.ok) {
            const data = await response.json()
            setUserManualFeeding(data)
            setAmount(data?.manualFeedingAmount || 0)
          } else {
            setUserManualFeeding(null)
            setAmount(0)
          }
        } catch (error) {
          console.error('Error fetching manual feeding:', error)
          toast({
            title: 'Error',
            description: 'Failed to load manual feeding data.',
            variant: 'destructive',
          })
        }
      }

      fetchManualFeeding()
    }
  }, [user?.email, toast])

  const handleSubmit = async () => {
    if (amount < 1 || amount > 50) {
      toast({
        title: 'Amount Error',
        description: 'Please enter a valid feeding amount between 1 and 50.',
        variant: 'destructive',
      })
      return
    }

    const newFeedingAmount = {
      user: user?.email,
      manualFeedingAmount: amount,
    }

    try {
      const response = await fetch(
        `http://localhost:5050/api/manualFeedings/user/${user?.email}`
      )

      if (response.status === 404) {
        const createResponse = await fetch(
          'http://localhost:5050/api/manualFeedings',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeedingAmount),
          }
        )

        if (!createResponse.ok) {
          toast({
            title: 'Error',
            description: 'Failed to create manual feeding.',
            variant: 'destructive',
          })
          return
        }

        toast({
          title: 'Manual Feeding Created',
          description: 'Your manual feeding preference has been saved.',
        })
      } else {
        const updateResponse = await fetch(
          `http://localhost:5050/api/manualFeedings/user/${user?.email}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeedingAmount),
          }
        )

        if (!updateResponse.ok) {
          toast({
            title: 'Error',
            description: 'Failed to update manual feeding.',
            variant: 'destructive',
          })
          return
        }

        toast({
          title: 'Manual Feeding Updated',
          description: 'Your manual feeding preference has been updated.',
        })
      }

      setUserManualFeeding({ manualFeedingAmount: amount })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description:
          'Something went wrong while saving the manual feeding amount.',
        variant: 'destructive',
      })
    }

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
    <CustomCard cardTitle="Manual Feeding">
      <CardContent>
        <div className="flex flex-col gap-4">
          {userManualFeeding ? (
            <div>
              <div className="text-2xl">
                {userManualFeeding.manualFeedingAmount} oz
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No manual feeding set.</div>
          )}
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
                <DialogDrawerTitle>Update Manual Feeding</DialogDrawerTitle>
                <DialogDrawerDescription>
                  Set your manual feeding amount.
                </DialogDrawerDescription>
              </DialogDrawerHeader>
              <div className="flex flex-col p-4 gap-5">
                <AmountSelector amount={amount} setAmount={setAmount} />
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
      </CardFooter>
    </CustomCard>
  )
}
