import assert from 'assert'
import { headers } from 'next/headers'

export const authorization = `Bearer ${process.env.SECRET}`
export const authorization_verify = () => {
  if (process.env.NODE_ENV !== 'production') return

  let bool = headers().get('authorization') === `Bearer ${process.env.SECRET}`
  assert(bool, 'Unauthorized')
}

export const post = async (url, body) => {
  let origin = `http://localhost:3000`
  if (process.env.VERCEL_URL) origin = `https://${process.env.VERCEL_URL}`

  url = `${origin}${url}`
  console.log(url)
  let res = await fetch(url, {
    method: 'POST',
    headers: { authorization },
    body: JSON.stringify(body),
  })

  console.log('res.ok', res.ok)
  let json = await res.json()
  if (!res.ok) throw new Error(json.error)

  return json
}
