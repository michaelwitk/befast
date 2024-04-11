import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verify } from 'jsonwebtoken'
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../../libs/cookie'

export const GET = async (req) => {
  const url = new URL(req.url)
  let { origin } = url
  let jwt = url.searchParams.get('jwt')

  verify(jwt, process.env.SECRET)

  cookies().set(COOKIE_NAME, jwt, COOKIE_OPTIONS)

  if (process.env.VERCEL_URL) origin = `https://${process.env.VERCEL_URL}`
  return redirect(origin)
}
