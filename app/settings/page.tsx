import Link from 'next/link'
import { IoPerson } from 'react-icons/io5'
import {
  FaBell,
  FaCog,
  FaExclamationTriangle,
  FaEye,
  FaPaperPlane,
  FaPhoneAlt,
  FaQuestionCircle,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardHeader } from '@/components/ui/card'
import NavBar from '@/components/ui/NavBar'
import { IoIosArrowForward } from 'react-icons/io'

type SettingsCardProps = {
  title: string
  href: string
  Icon?: IconType
}

function SearchInput() {
  return (
    <div className="relative w-[80%] mx-auto">
      <Input type="search" placeholder="Search..." className="pl-8" />
      <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  )
}

function SettingsCard({ title, href, Icon = FaCog }: SettingsCardProps) {
  return (
    <Link href={href}>
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-row items-center gap-3">
            <span className="w-6 h-6 scale-[1.3] bg-[#FB8E20] rounded-full flex items-center justify-center">
              <Icon className="text-white size-4" />
            </span>
            <h1>{title}</h1>
            <IoIosArrowForward className="text-gray-500 ml-auto" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default function SettingsPage() {
  const settings = {
    general: [
      {
        title: 'Account',
        href: 'account',
        Icon: IoPerson,
      },
      {
        title: 'Nofications',
        href: 'notifications',
        Icon: FaBell,
      },
      {
        title: 'Appearance',
        href: 'appearance',
        Icon: FaEye,
      },
      {
        title: 'Privacy & Security',
        href: 'privacy',
        Icon: FaShieldAlt,
      },
      {
        title: 'Your Device',
        href: 'yourdevice',
      },
    ],
    feedback: [
      {
        title: 'About',
        href: 'about',
        Icon: FaQuestionCircle,
      },
      {
        title: 'Help and Support',
        href: 'contact',
        Icon: FaPhoneAlt,
      },
      {
        title: 'Report a Problem',
        href: 'https://github.com/stardustgd/SmartPetFeeder/issues',
        Icon: FaExclamationTriangle,
      },
      {
        title: 'Send Feedback',
        href: 'feedback',
        Icon: FaPaperPlane,
      },
    ],
  }
  return (
    <>
      <NavBar title="Settings" showArrow={true} />
      <div className="flex flex-col gap-3 px-5 py-5 w-screen h-screen rounded-t-2xl bg-[#F2F2F2] text-black pb-20 md:pb-0 md:pl-20">
        <SearchInput />
        <Label className="text-md font-bold">General</Label>
        {settings.general.map((setting) => (
          <SettingsCard
            key={setting.href}
            title={setting.title}
            href={setting.href}
            Icon={setting.Icon}
          />
        ))}

        <Label className="text-md font-bold">Feedback</Label>
        {settings.feedback.map((setting) => (
          <SettingsCard
            key={setting.href}
            title={setting.title}
            href={setting.href}
            Icon={setting.Icon}
          />
        ))}
      </div>
    </>
  )
}
