'use server'

import { randomUUID } from 'crypto'
import { s3presigned } from '../libs/s3'

export const form_s3 = async (name, contentType) => {
  const Bucket = 'public'
  const Key = randomUUID()

  let aws = await s3presigned({
    Bucket,
    Key,
    contentType,
    name,
    user: 'user1',
  })

  return {
    Bucket,
    Key,
    aws,
  }
}
