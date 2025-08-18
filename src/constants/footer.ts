import {
  PiBone,
  PiBoneFill,
  PiGear,
  PiGearFill,
  PiPhone,
  PiPhoneFill,
  PiVinylRecord,
  PiVinylRecordFill,
} from 'react-icons/pi'

export const links = [
  {
    href: '/',
    icon: PiBone,
    filledIcon: PiBoneFill,
    fillColor: 'fill-[#BFA88E]',
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
