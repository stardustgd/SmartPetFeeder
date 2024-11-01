import CustomCard from '@/components/ui/CustomCard'
import DaySelector from '@/components/ui/DaySelector'
import NavBar from '@/components/ui/NavBar'
import TimePicker from '@/components/ui/TimePicker'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function FeedingPage() {
  return (
    <div className="bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] h-screen">
      <NavBar showArrow={true} />
      <div className="flex flex-col gap-5 px-5 py-5 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <CustomCard cardTitle="Manual Feeding Amount" cardDescription="1 Cup" />
        <CustomCard cardTitle="Scheduled Feeding">
          <CardContent>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg[#F7BE7A]" />
              <div className="space-y-2">
                <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
                <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
                <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
                <p className="leading-none">9:00 AM, Daily, 1 Serving</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] w-full">
                  Edit Feeding Schedule
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Edit Feeding Schedule</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col p-4 gap-5">
                    <DaySelector />
                    <TimePicker />
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Save Schedule</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardFooter>
        </CustomCard>
      </div>
    </div>
  )
}
