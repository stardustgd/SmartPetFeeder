import { IoIosArrowBack } from 'react-icons/io'
import Link from 'next/link'

type NavBar = {
  title?: string
  showArrow?: boolean
}

export default function NavBar(props: NavBar) {
  return (
    <div className="flex justify-center items-center h-16">
      <Link href="/" className="absolute left-0 px-12">
        {props.showArrow && <IoIosArrowBack className="fill-white" />}
      </Link>
      <h1 className="text-white text-md">
        {props.title || 'Smart Pet Feeder'}
      </h1>
    </div>
  )
}
