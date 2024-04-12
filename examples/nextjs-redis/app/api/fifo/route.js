import { authorization_verify } from '../../../libs/auth'

export const POST = async (req) => {
  authorization_verify()
  return Response.json({})
}
