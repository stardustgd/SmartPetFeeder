'use client'

import { FaPlus } from 'react-icons/fa'
import { useState, useContext } from 'react'
import { useToast } from '@/hooks/use-toast'
import CustomCard from '@/components/CustomCard'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  SUCCESS_TOAST,
  MANUAL_FEEDING_SUCCESS_MESSAGE,
  ERROR_TOAST,
  MANUAL_FEEDING_ERROR_MESSAGE,
} from '@/constants'
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/modal'
import { formatManualFeedingAmount } from '@/lib/utils'
import AmountSelector from '@/components/inputs/AmountSelector'
import UserContext from '@/src/contexts/UserContext'
import { SET_USER_PREFERENCES } from '@/src/reducers/actionTypes'

export default function ManualFeeding() {
  const { user, userDispatch } = useContext(UserContext)
  const manualFeedingAmount = user.preferences.manualFeedingAmount
  const [amount, setAmount] = useState<number>(manualFeedingAmount)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (amount < 1 || amount > 10) {
      toast({
        title: ERROR_TOAST,
        description: MANUAL_FEEDING_ERROR_MESSAGE,
      })
    }

    const newAmount = {
      manualFeedingAmount: amount,
    }

    // Update preferences in Mongo and in Context
    await fetch('/api/users/preferences', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(newAmount),
    })
      .then((response) => {
        if (response.ok) {
          userDispatch({
            type: SET_USER_PREFERENCES,
            payload: { manualFeedingAmount: amount },
          })

          toast({
            title: SUCCESS_TOAST,
            description: MANUAL_FEEDING_SUCCESS_MESSAGE,
          })
          setIsOpen(false)
        }
      })
      .catch((_) => {
        toast({
          title: ERROR_TOAST,
          description: 'Something went wrong',
        })
      })
  }

  return (
    <CustomCard cardTitle="Manual Feeding">
      <CardContent>
        <div className="flex flex-col gap-4">
          {manualFeedingAmount === -1 ? (
            <p className="text-gray-500">No manual feeding amount set</p>
          ) : (
            <h1 className="text-2xl">
              {formatManualFeedingAmount(manualFeedingAmount)}
            </h1>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <ModalTrigger asChild>
            <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] text-xl h-12 w-full">
              <FaPlus />
            </Button>
          </ModalTrigger>
          <ModalContent>
            <div className="mx-auto w-full max-w-sm">
              <ModalHeader>
                <ModalTitle>Update Manual Feeding</ModalTitle>
                <ModalDescription>
                  Set your manual feeding amount.
                </ModalDescription>
              </ModalHeader>
              <div className="flex flex-col p-4 gap-5">
                <AmountSelector amount={amount} setAmount={setAmount} />
              </div>
            </div>
            <ModalFooter>
              <Button
                onClick={handleSubmit}
                className="hover:bg-[#DA8359] text-md h-12"
              >
                Save Changes
              </Button>
              <ModalClose asChild>
                <Button
                  variant="outline"
                  className="hover:bg-[#D9D9D9] text-md h-12"
                >
                  Cancel
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardFooter>
    </CustomCard>
  )
}
