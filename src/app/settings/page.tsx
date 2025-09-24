import Link from 'next/link'
import { FaCog } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Label } from '@/components/ui/label'
import { Card, CardHeader } from '@/components/ui/card'
import NavBar from '@/components/NavBar'
import { IoIosArrowForward } from 'react-icons/io'
import { settings } from '@/constants/settings'
import { verifyAuthToken } from '@/lib/auth'
import { redirect } from 'next/navigation'

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

export default async function SettingsPage() {
  const user = await verifyAuthToken()
  if (!user) redirect('/login')

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
