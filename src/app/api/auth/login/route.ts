import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const TOKEN_EXPIRATION = '7d'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const client = await clientPromise
  const db = client.db('survey')
  const user = await db.collection('users').findOne({ email })

  if (!user || !user.password)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  if (!user.isVerified)
    return NextResponse.json({ error: 'Please verify your email before logging in.' }, { status: 403 })

  const isMatch = await compare(password, user.password)
  if (!isMatch)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  // You can add more user fields if needed
  const token = jwt.sign(
    { userId: user._id.toString(), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  )

  const response = NextResponse.json({ message: 'Login successful' })
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
  })

  return response
}
