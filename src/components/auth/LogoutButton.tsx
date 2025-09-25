'use client'
import { Button } from '@/src/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'

export default function LogoutButton() {
  const { toast } = useToast()
  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (res.ok) {
      toast({
        title: 'Logged Out',
        description: 'You are now logged out',
      })
      redirect('/login')
    }
  }
  return (
    <Button
      className="absolute top-4 right-4 border-2 border-[#F2F2F2] bg-[#FB8E20]"
      onClick={handleLogout}
    >
      Sign Out
    </Button>
  )
}
