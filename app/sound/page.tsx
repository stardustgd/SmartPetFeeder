import NavBar from '@/components/ui/NavBar'
import CustomCard from '@/components/ui/CustomCard'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { FaPlus } from 'react-icons/fa'

export default function SoundPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#433D8B] to-[#17153B] min-h-screen">
      <NavBar showArrow={true} title="Sound" />
      <div className="h-full flex items-center justify-center grow">
        <Button className="bg-white size-72 rounded-full text-black text-2xl">
          Music
        </Button>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="bg-transparent h-24">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Song Settings</DrawerTitle>
              <DrawerDescription>Modify your song settings.</DrawerDescription>
            </DrawerHeader>
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
          <DrawerFooter className="mx-auto w-full max-w-sm">
            <Button className="bg-[#8675B1] text-xl h-12">
              <FaPlus />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
