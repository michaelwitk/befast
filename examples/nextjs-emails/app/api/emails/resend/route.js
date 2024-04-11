import assert from 'assert'

import { headers } from 'next/headers'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND)

export const POST = async (req) => {
  let authorization = headers().get('authorization')
  try {
    assert(authorization === `Bearer ${process.env.SECRET}`)
  } catch (error) {
    console.error(error)

    return Response.json({}, { status: 401 })
  }

  const {
    From: from, // sender@example.com
    To: to, // recipient@example.com
    Subject: subject, // Test
    TextBody: text, // Hello from Postmark!
  } = await req.json()

  const { data, error } = await resend.emails.send({
    from: `Support <${from}>`,
    to: [to],
    subject,
    text,
  })
  console.log({ data, error })

  if (error) return Response.json({ error }, { status: 500 })

  return Response.json({ data })
}
