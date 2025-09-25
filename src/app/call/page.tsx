import { Button } from '@/components/ui/button'
import NavBar from '@/components/NavBar'
import { FaCamera, FaMicrophone, FaPhoneAlt } from 'react-icons/fa'
import { verifyAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CallPage() {
  const user = await verifyAuthToken()
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col bg-linear-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar title="Call" />
      <div className="flex flex-col items-center grow gap-5 px-5 py-5 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <img
          width={640}
          height={480}
          src={process.env.NEXT_PUBLIC_CAMERA_FEED_URL}
          className="shadow-md"
        />
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
