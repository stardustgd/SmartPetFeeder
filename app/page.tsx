import Link from 'next/link'
import Image from 'next/image'
import NavBar from '@/components/ui/NavBar'
import { Button } from '@/components/ui/button'

type MenuButtonProps = {
  href: string
  title: string
}
function MenuButton({ href, title }: MenuButtonProps) {
  return (
    <Button
      asChild
      className="bg-[#FCFCFC] hover:bg-[#DA8359] active:bg-[#DA8359] hover:text-white active:text-white text-black w-full h-16"
    >
      <Link href={href}>{title}</Link>
    </Button>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F7BE7A] to-[#DA8359] min-h-screen">
      <NavBar />
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="mx-auto pb-24"
      />

      <div className="flex flex-col flex-grow justify-between px-5 py-8 w-screen rounded-t-2xl bg-[#F2F2F2] text-black">
        <div className="justify-center grid grid-cols-2 gap-3 gap-y-12">
          <MenuButton href="feeding/" title="Feed" />
          <MenuButton href="water/" title="Water" />
          <MenuButton href="sound/" title="Sound" />
          <MenuButton href="call/" title="Call" />
        </div>
        <Button
          asChild
          className="bg-[#DA8359] hover:bg-[#F7BE7A] active:bg-[#F7BE7A] w-full h-12"
        >
          <Link href="settings/">Settings</Link>
        </Button>
      </div>
    </div>
  )
}
