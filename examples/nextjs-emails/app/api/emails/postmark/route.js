import assert from 'assert'

import { headers } from 'next/headers'
const postmark = require('postmark')

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN)

export const POST = async (req) => {
  let authorization = headers().get('authorization')
  try {
    assert(authorization === `Bearer ${process.env.SECRET}`)
  } catch (error) {
    console.error(error)

    return Response.json({}, { status: 401 })
  }

  const {
    From, // sender@example.com
    To, // recipient@example.com
    Subject, // Test
    TextBody, // Hello from Postmark!
  } = await req.json()

  try {
    await client.sendEmail({
      From,
      To,
      Subject,
      TextBody,
    })
  } catch (error) {
    console.error(error)

    error = 'Something went wrong. Check your server logs.'
    return Response.json({ error }, { status: 401 })
  }

  return Response.json({})
}
