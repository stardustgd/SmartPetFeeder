'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schema'
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
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.status !== 201) {
        throw new Error(data.message || 'Something went wrong')
      }

      router.push('/login')
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.setError('confirmPassword', {
          type: 'manual',
          message: error.message,
        })
        form.setError('password', { type: 'manual', message: '' })
        form.setError('email', { type: 'manual', message: '' })
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-10 md:px-10 md:py-16 w-screen h-fit rounded-2xl bg-[#F2F2F2] text-black max-w-md mx-auto">
      <h1 className="text-4xl">Register</h1>
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
                <FormLabel>Email</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
      <div className="w-full relative flex pb-5 items-center">
        <div className="grow border-t border-gray-400"></div>
        <span className="shrink mx-4 text-gray-400">or</span>
        <div className="grow border-t border-gray-400"></div>
      </div>
      <Link href="/login/">
        <h1 className="text-center text-bold">
          Already have an account? <span className="text-blue-600">Login</span>
        </h1>
      </Link>
    </div>
  )
}
