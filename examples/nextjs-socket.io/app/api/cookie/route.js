import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'
import { COOKIE_NAME } from '../../../lib/cookie'

export const POST = async () => {
  const uuid = randomUUID()
  let day = 60 * 60 * 24

  let jwt = sign({ uuid }, process.env.SECRET, { expiresIn: day })
  cookies().set(COOKIE_NAME, jwt, {
    secure: true,
    httpOnly: true,
  })

  return Response.json({})
}

export const DELETE = async () => {
  cookies().delete(COOKIE_NAME)

  return Response.json({})
}
