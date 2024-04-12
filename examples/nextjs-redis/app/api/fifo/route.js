import { authorization_verify } from '../../../libs/auth'

export const POST = async (req) => {
  authorization_verify()

  let startedAt = Date.now()
  await new Promise((r) => setTimeout(r, 1000 * 1))
  let finishedAt = Date.now()

  return Response.json({ startedAt, finishedAt })
}
