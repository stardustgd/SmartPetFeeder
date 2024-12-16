import { Button } from '@/components/ui/button'
import NavBar from '@/components/ui/NavBar'
import { FaCamera, FaMicrophone, FaPhoneAlt } from 'react-icons/fa'

export default function CallPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar showArrow={true} title="Call" />
      <div className="flex flex-col flex-grow gap-5 px-5 py-5 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <div className="h-96 bg-gray-500"></div>
        <div className="flex flex-row justify-center gap-12">
          <Button className="bg-[#A5B68D] rounded-full size-16">
            <FaCamera className="size-12" />
          </Button>
          <Button className="rounded-full size-16">
            <FaPhoneAlt className="size-12" />
          </Button>
          <Button className="bg-[#A5B68D] rounded-full size-16">
            <FaMicrophone className="size-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}
