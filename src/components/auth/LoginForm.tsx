'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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

export default function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const { email, password } = values

    // TODO: check if a user is already signed in

    try {
      const res = await fetch(`/api/auth/login`, {
        body: JSON.stringify({ email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      if (!res.ok) {
        form.setError('email', { message: '' })
        form.setError('password', {
          type: 'server',
          message: 'Invalid email or password',
        })

        throw new Error('Error logging in')
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }
  return (
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
  )
}
