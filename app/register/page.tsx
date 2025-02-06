'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaGithub } from 'react-icons/fa'

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
import { RegisterSchema } from '@/schema'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    try {
      const response = await fetch('http://localhost:5050/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (data.message === 'Email already in use') {
        form.setError('email', {
          type: 'manual',
          message: 'This email address is already in use',
        })
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error(error)
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'An error occurred during login',
      })
      form.setError('password', { type: 'manual', message: '' })
      form.setError('email', { type: 'manual', message: '' })
    }
  }

  return (
    <>
      <NavBar title="Register" />
      <div className="flex flex-col items-center gap-3 px-5 py-5 w-screen h-fit rounded-2xl bg-[#F2F2F2] text-black">
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
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button className="flex gap-2 bg-black">
          <FaGithub />
          Continue with GitHub
        </Button>
        <Link href="/login/">
          <h1 className="text-center text-bold">
            Already have an account?{' '}
            <span className="text-blue-600">Login</span>
          </h1>
        </Link>
      </div>
    </>
  )
}
