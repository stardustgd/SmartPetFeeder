'use client'

import { useState } from 'react'
import CustomCard from '@/components/CustomCard'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
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

export default function WaterPreferences() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <Button className="bg-transparent h-24 shadow-none">Open Drawer</Button>
      </ModalTrigger>
      <ModalContent>
        <div className="mx-auto w-full max-w-sm">
          <ModalHeader>
            <ModalTitle>Song Preferences</ModalTitle>
            <ModalDescription>Modify your song preferences.</ModalDescription>
          </ModalHeader>
        </div>
        <div className="flex flex-col p-4 gap-5">
          <CustomCard cardTitle="Comfort Song" />
          <CustomCard cardTitle="Song 1 Schedule">
            <CardContent>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
                <div className="space-y-2">
                  <p className="leading-none">9:00 AM, Daily</p>
                </div>
              </div>
            </CardContent>
          </CustomCard>
          <CustomCard cardTitle="Song 2 Schedule">
            <CardContent>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
                <div className="space-y-2">
                  <p className="leading-none">6:00 PM, Friday</p>
                </div>
              </div>
            </CardContent>
          </CustomCard>
        </div>
        <ModalFooter className="mx-auto w-full max-w-sm">
          <Button className="bg-[#8675B1] hover:bg-[#433D8B] text-md h-12">
            Edit Preferences
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
  )
}
