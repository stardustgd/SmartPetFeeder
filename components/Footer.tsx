'use client'

import Link from 'next/link'
import {
  PiBone,
  PiBoneFill,
  PiDrop,
  PiDropFill,
  PiGear,
  PiGearFill,
  PiPhone,
  PiPhoneFill,
  PiVinylRecord,
  PiVinylRecordFill,
} from 'react-icons/pi'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  const links = [
    {
      href: '/',
      icon: PiBone,
      filledIcon: PiBoneFill,
      fillColor: 'fill-[#BFA88E]',
    },
    {
      href: '/water',
      icon: PiDrop,
      filledIcon: PiDropFill,
      fillColor: 'fill-[#347BA7]',
    },
    {
      href: '/sound',
      icon: PiVinylRecord,
      filledIcon: PiVinylRecordFill,
      fillColor: 'fill-[#433D8B]',
    },
    {
      href: '/call',
      icon: PiPhone,
      filledIcon: PiPhoneFill,
      fillColor: 'fill-[#A5B68D]',
    },
    {
      href: '/settings',
      icon: PiGear,
      filledIcon: PiGearFill,
      fillColor: 'fill-gray-800',
    },
  ]

  return (
    <div className="bg-[#f2f2f2] fixed bottom-0 w-full md:w-auto h-auto md:h-screen px-8 md:px-4 py-5 md:py-8 flex flex-row md:flex-col items-center justify-between border border-t-gray-300">
      {links.map(({ href, icon: Icon, filledIcon: FilledIcon, fillColor }) => (
        <Link key={href} href={href}>
          {pathname === href ? (
            <FilledIcon className={`size-6 ${fillColor}`} />
          ) : (
            <Icon className="size-6 fill-black" />
          )}
        </Link>
      ))}
    </div>
  )
}
