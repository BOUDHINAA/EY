import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev', 
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email address.</p>`,
  })
}
