import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { COOKIE_NAME } from '../../../libs/cookie'

export const GET = async (req) => {
  let url = new URL(req.url)
  let jwt = url.searchParams.get('jwt')

  try {
    verify(jwt, process.env.SECRET)
  } catch (error) {
    return Response.json({ error }, { status: 401 })
  }

  cookies().set(COOKIE_NAME, jwt, {
    secure: true,
    httpOnly: true,
  })

  return Response.redirect(url.origin)
}
