import NavBar from '@/components/ui/NavBar'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

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
        </DrawerContent>
      </Drawer>
    </div>
  )
}
