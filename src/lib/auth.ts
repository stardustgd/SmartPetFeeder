import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET_KEY!

export async function verifyAuthToken() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('authorization')?.value

  if (!authCookie) return null

  try {
    const payload = jwt.verify(authCookie, JWT_SECRET)
    return payload
  } catch (error) {
    console.error('Invalid auth token', error)
    return null
  }
}
