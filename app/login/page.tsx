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
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [accessToken, setAccessToken] = useState('')
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (accessToken) {
      console.log('Access Token Updated:', accessToken)
      fetchUser()
    }
  }, [accessToken])

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5050/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const data = await response.json()
    console.log('Login Response:', data)

    if (!data.accessToken) {
      console.error('No access token received.')
      return false
    }

    setAccessToken(data.accessToken)
    console.log('Access Token Set:', accessToken)
    return true
  }

  const fetchUser = async () => {
    if (!accessToken) {
      console.log('No access token available.')
      return
    }

    console.log('Fetching user with token:', accessToken)

    const response = await fetch(
      'http://localhost:5050/api/auth/current-user',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    const data = await response.json()
    console.log('User Response:', data)

    if (!data.loggedIn) {
      console.log('User is not logged in.')
      await refreshAccessToken()
    } else {
      console.log('User logged in:', data.user)
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.status === 403) {
        console.log('Refresh token invalid, user must log in again.')
        return logout()
      }

      const data = await response.json()
      if (data.accessToken) {
        setAccessToken(data.accessToken)
        console.log('Access token refreshed.')
      }
    } catch (error) {
      console.error('Error refreshing access token:', error)
    }
  }

  const logout = async () => {
    try {
      await fetch('http://localhost:5050/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setAccessToken('')
      console.log('User logged out.')
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const success = await login(values.email, values.password)

    if (!success) {
      form.setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      })
      return
    }

    console.log('Login successful, fetching user data...')
    router.push('/')
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
