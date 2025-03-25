'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schema'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()
  const { user } = useAuth()

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const data = await response.json()

    if (!data.accessToken) {
      console.error('No access token received.')
      return false
    }

    return true
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      window.location.reload()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    if (user) {
      form.setError('email', {
        type: 'manual',
        message: 'You cannot log into another account until you sign out',
      })
      return
    }
    const success = await login(values.email, values.password)

    if (!success) {
      form.setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      })
      return
    }

    router.push('/')
  }

  return (
    <>
      <NavBar title="Login" />
      <Button
        onClick={logout}
        className="absolute top-4 right-4 border-2 border-white hover:bg-[#dea15f]"
      >
        Sign Out
      </Button>
      <div className="flex flex-col items-center gap-3 px-6 py-10 md:px-10 md:py-16 w-screen h-fit rounded-2xl bg-[#F2F2F2] text-black max-w-md mx-auto">
        <h1 className="text-4xl">Sign In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3 pb-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div className="w-full relative flex pb-5 items-center">
          <div className="grow border-t border-gray-400"></div>
          <span className="shrink mx-4 text-gray-400">or</span>
          <div className="grow border-t border-gray-400"></div>
        </div>
        <Link href="/register/">
          <h1 className="text-center text-bold">
            Need an account? <span className="text-blue-600">Register</span>
          </h1>
        </Link>
      </div>
    </>
  )
}
