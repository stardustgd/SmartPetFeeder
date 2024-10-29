import NavBar from '@/components/ui/NavBar'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <>
      <NavBar title="Login" showArrow={true} />
      <div className="flex flex-col items-center gap-3 px-5 py-5 w-screen h-fit rounded-2xl bg-[#F2F2F2] text-black">
        <h1 className="text-4xl">Sign In</h1>
        <form className="w-full space-y-3 pb-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Username</Label>
            <Input type="email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Password</Label>
            <Input type="password" />
          </div>
        </form>
        <Button className="bg-[#F7BE7A] hover:bg-[#DA8359] w-full">
          Login
        </Button>
        <div className="w-full relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button className="flex gap-2">
          <FaGithub />
          Continue with GitHub
        </Button>
        <Link href="/register/">
          <h1 className="text-center text-bold">
            Need an account? <span className="text-blue-600">Register</span>
          </h1>
        </Link>
      </div>
    </>
  )
}
