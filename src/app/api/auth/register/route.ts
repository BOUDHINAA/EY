import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import clientPromise from '@/lib/mongodb'
import { v4 as uuidv4 } from 'uuid'
import sendVerificationEmail from '@/lib/sendVerificationEmail'

// ✅ Define your validation schema
const registrationSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères")
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    
    const parsed = registrationSchema.parse(body)

    const client = await clientPromise
    const db = client.db('survey')

    const existingUser = await db.collection('users').findOne({ email: parsed.email })
    if (existingUser) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 })
    }

    const hashedPassword = await hash(parsed.password, 12)
    const verificationToken = uuidv4()

    await db.collection('users').insertOne({
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      createdAt: new Date()
    })

    await sendVerificationEmail(parsed.email, verificationToken)

    return NextResponse.json({ message: 'Compte créé ! Vérifie ton email.' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }

    console.error('Erreur serveur :', err)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
