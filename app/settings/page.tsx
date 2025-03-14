'use client'

import useAuth from '@/hooks/useAuth'
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
  FaRecordVinyl,
  FaShieldAlt,
} from 'react-icons/fa'
import { GiDogBowl } from 'react-icons/gi'
import { IconType } from 'react-icons'
import { Label } from '@/components/ui/label'
import { Card, CardHeader } from '@/components/ui/card'
import NavBar from '@/components/NavBar'
import { IoIosArrowForward } from 'react-icons/io'

type SettingsCardProps = {
  title: string
  href: string
  Icon?: IconType
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
  useAuth()
  
  const settings = {
    general: [
      {
        title: 'Account',
        href: '/login',
        Icon: IoPerson,
      },
      {
        title: 'Notifications',
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
    preferences: [
      {
        title: 'Feeder Preferences',
        href: '/feeding',
        Icon: GiDogBowl,
      },
      {
        title: 'Music Preferences',
        href: '/sound',
        Icon: FaRecordVinyl,
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
      <NavBar title="Settings" />
      <div className="flex flex-col gap-3 px-5 py-5 w-screen h-fit rounded-t-2xl bg-[#F2F2F2] text-black pb-24 md:pb-0 md:pl-20">
        <Label className="text-md font-bold">General</Label>
        {settings.general.map((setting) => (
          <SettingsCard
            key={setting.href}
            title={setting.title}
            href={setting.href}
            Icon={setting.Icon}
          />
        ))}
        <Label className="text-md font-bold">Preferences</Label>
        {settings.preferences.map((setting) => (
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
