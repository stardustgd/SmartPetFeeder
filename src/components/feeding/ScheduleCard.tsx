'use client'

import { IoTrash } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '../ui/card'
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
import { convertToAMPM, capitalizeDays, sortDaysOfWeek } from '@/lib/utils'

type ScheduleCardProps = {
  days: string[]
  time: string
  amount: string
  idx: string
  handleDeletion: (index: string) => void
}

export default function ScheduleCard({
  days,
  time,
  amount,
  idx,
  handleDeletion,
}: ScheduleCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formattedDays =
    days.length === 7 ? 'Every Day' : capitalizeDays(sortDaysOfWeek(days))

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="flex flex-row items-center justify-between py-6 px-4">
        <div className="flex flex-col">
          <h1 className="text-2xl">{convertToAMPM(time)}</h1>
          <h1>
            {amount}
            <br />
            {formattedDays}
          </h1>
        </div>
        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <ModalTrigger asChild>
            <div className="cursor-pointer">
              <IoTrash className="size-6 " />
            </div>
          </ModalTrigger>
          <ModalContent>
            <div className="mx-auto w-full max-w-sm">
              <ModalHeader>
                <ModalTitle>Delete Schedule</ModalTitle>
                <ModalDescription>
                  Are you sure you want to delete this schedule?
                </ModalDescription>
              </ModalHeader>
              <div className="md:pt-8">
                <ModalFooter>
                  <Button
                    onClick={() => handleDeletion(idx)}
                    className="bg-[#da5959] hover:bg-[#bf4949] text-md h-12"
                  >
                    Delete Schedule
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
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </Card>
  )
}
