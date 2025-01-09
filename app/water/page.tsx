import CustomCard from '@/components/ui/CustomCard'
import NavBar from '@/components/ui/NavBar'
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

export default function WaterPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#53B1C9] to-[#394E92] min-h-screen pb-8">
      <NavBar showArrow={true} title="Water" />
      <div className="h-full flex items-center justify-center grow">
        <Button className="bg-white size-72 rounded-full text-black text-2xl active:size-[16rem]">
          Water
        </Button>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="bg-transparent h-24">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Water Settings</DrawerTitle>
              <DrawerDescription>Set your water preferences.</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col p-4 gap-5">
              <CustomCard cardTitle="Daily Morning">
                <CardContent>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
                    <div className="space-y-2">
                      <p className="leading-none">9:00 AM, Daily, 100 ml</p>
                    </div>
                  </div>
                </CardContent>
              </CustomCard>
              <CustomCard cardTitle="Afternoon">
                <CardContent>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
                    <div className="space-y-2">
                      <p className="leading-none">6:00 MM, Daily, 200 ml</p>
                    </div>
                  </div>
                </CardContent>
              </CustomCard>
            </div>
          </div>
          <DrawerFooter className="mx-auto w-full max-w-sm">
            <Button className="bg-[#6BD9E2] text-xl h-12">
              <FaPlus />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
