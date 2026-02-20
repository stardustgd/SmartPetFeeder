import { verifyAuthToken } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

import { QueryProvider } from '@/components/QueryProvider'
import { UserProvider } from '@/components/UserProvider'
import Footer from '@/components/Footer'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await verifyAuthToken()
  if (!user) redirect('/login')
  return (
    <QueryProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </UserProvider>
    </QueryProvider>
  )
}
