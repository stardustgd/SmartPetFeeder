import { IoPerson } from 'react-icons/io5'
import {
  FaBell,
  FaExclamationTriangle,
  FaEye,
  FaPaperPlane,
  FaPhoneAlt,
  FaQuestionCircle,
  FaRecordVinyl,
  FaShieldAlt,
} from 'react-icons/fa'
import { GiDogBowl } from 'react-icons/gi'

export const settings = {
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
