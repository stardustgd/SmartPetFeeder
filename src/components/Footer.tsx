'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { links } from '@/constants/footer'

export default function Footer() {
  const pathname = usePathname()

  return (
    <div className="bg-[#f2f2f2] fixed bottom-0 w-full md:w-auto h-auto md:h-screen px-8 md:px-4 pb-8 py-4 md:py-8 flex flex-row md:flex-col items-center justify-between border border-t-gray-300">
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
