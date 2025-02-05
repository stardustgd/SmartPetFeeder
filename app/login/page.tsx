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
import { LoginSchema } from '@/schema'
<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
=======
import { useRouter } from 'next/navigation'
>>>>>>> 750f6a12c497ee8ea4b778df8c90c6e81a48bb00

export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

<<<<<<< HEAD
  const [isNew, setIsNew] = useState(true)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined
      if (!id) return
      setIsNew(false)

      try {
        const response = await fetch(`http://localhost:5050/record/${id}`)
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`
          console.error(message)
          return
        }

        const record = await response.json()
        if (!record) {
          console.warn(`Record with id ${id} not found`)
          router.push('/')
          return
        }

        form.reset(record)
      } catch (error) {
        console.error('Error fetching record: ', error)
      }
    }

    fetchData()
  }, [params.id, router, form])

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      // Send login data to the backend
      const response = await fetch('http://localhost:5050/record/login', {
=======
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
>>>>>>> 750f6a12c497ee8ea4b778df8c90c6e81a48bb00
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify(values), // Send email and password
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Login successful:', data);
        router.push('/'); 
      } else {
        console.error('Login failed:', data.message);
        form.setError('email', {
          type: 'manual',
          message: data.message || 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      form.setError('email', {
        type: 'manual',
        message: 'An error occurred during login',
      });
=======
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        form.setError('password', {
          type: 'manual',
          message: 'Invalid email or password',
        })
        form.setError('email', { type: 'manual', message: '' })
      } else {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      form.setError('password', {
        type: 'manual',
        message: 'An error occurred during login',
      })
      form.setError('email', { type: 'manual', message: '' })
>>>>>>> 750f6a12c497ee8ea4b778df8c90c6e81a48bb00
    }
  }

  return (
    <>
      <NavBar title="Login" />
      <div className="flex flex-col items-center gap-3 px-5 py-5 w-screen h-fit rounded-2xl bg-[#F2F2F2] text-black">
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
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button className="flex gap-2 bg-black">
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
