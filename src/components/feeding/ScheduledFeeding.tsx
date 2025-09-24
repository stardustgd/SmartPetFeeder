'use client'

import { FaPlus } from 'react-icons/fa'
import { useState, useContext } from 'react'
import { useToast } from '@/hooks/use-toast'
import AmountSelector from '@/components/inputs/AmountSelector'
import CustomCard from '@/components/CustomCard'
import DaySelector from '@/components/inputs/DaySelector'
import TimePicker from '@/components/inputs/TimePicker'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
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
import ScheduleCard from './ScheduleCard'
import UserContext from '@/src/contexts/UserContext'
import { SET_USER_SCHEDULES } from '@/src/reducers/actionTypes'
import { sortDaysOfWeek } from '@/src/lib/utils'

export default function ScheduledFeeding() {
  const { user, userDispatch } = useContext(UserContext)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [time, setTime] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      if (selectedDays.length === 0 || time === '') {
        throw new Error(
          'Please select days and a time for the feeding schedule'
        )
      }

      if (amount === undefined || amount < 1 || amount > 120) {
        throw new Error(
          'Please enter a valid feeding amount between 1 and 120.'
        )
      }

      const newEntry = {
        days: sortDaysOfWeek(selectedDays),
        time: time,
        amount: amount,
      }

      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newEntry),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      userDispatch({
        type: SET_USER_SCHEDULES,
        payload: data.schedules,
      })

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

  const handleDeletion = async (index: string) => {
    try {
      const deleteBody = {
        scheduleId: index,
      }

      const response = await fetch('/api/schedules', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(deleteBody),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      userDispatch({
        type: SET_USER_SCHEDULES,
        payload: data.schedules,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

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
              idx={schedule._id}
              handleDeletion={handleDeletion}
            />
          ))}
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
                <ModalTitle>New Schedule</ModalTitle>
                <ModalDescription>
                  Create a new feeding schedule.
                </ModalDescription>
              </ModalHeader>
              <div className="flex flex-col p-4 gap-5">
                <DaySelector
                  selectedDays={selectedDays}
                  setSelectedDays={setSelectedDays}
                />
                <TimePicker time={time} setTime={setTime} />
                <AmountSelector amount={amount} setAmount={setAmount} />
              </div>
            </div>
            <ModalFooter>
              <Button
                onClick={handleSubmit}
                className="hover:bg-[#DA8359] text-md h-12"
              >
                Save Schedule
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
