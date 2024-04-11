import { headers } from 'next/headers'

export const POST = async (req) => {
  console.log(await req.json())
  console.log(headers())

  // lemonSqueezySetup({ apiKey })
  // const { data, error, statusCode } = await getAuthenticatedUser()
  // console.log({ data, error, statusCode })

  return Response.json({})
}
