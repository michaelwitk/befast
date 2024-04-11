import assert from 'assert'
import { headers } from 'next/headers'

export const POST = async (req) => {
  let authorization = headers().get('authorization')
  try {
    assert(authorization === `Bearer ${process.env.SECRET}`)
  } catch (error) {
    return Response.json({}, { status: 401 })
  }

  const text = new URL(req.url).searchParams.get('text')
  console.log({ text })

  return Response.json({})
}
