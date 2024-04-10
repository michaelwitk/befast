'use server'

import {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3client = new S3Client({
  forcePathStyle: true,
  endpoint: process.env.S3_API, // `https://s3.earfee.com`,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
})

export const s3presigned = async ({ Bucket, Key, contentType, name, user }) => {
  const fields = {}
  if (user) fields['x-amz-meta-user'] = String(user)
  return await createPresignedPost(s3client, {
    Bucket,
    Key,
    Conditions: [
      ['content-length-range', 0, 512000000], // 10485760 up to 10 MB
      ['starts-with', '$Content-Type', contentType],
    ],
    Fields: {
      // acl: 'public-read',
      'Content-Type': contentType,
      'x-amz-meta-filename': name,
      ...fields,
    },
    Expires: 3600, // Seconds before the presigned post expires. 3600 by default.
  })
}

export const s3head = async ({ Bucket, Key }) =>
  s3client.send(new HeadObjectCommand({ Bucket, Key }))

export const s3url = async ({ Bucket, Key }) =>
  getSignedUrl(s3client, new GetObjectCommand({ Bucket, Key }), {
    expiresIn: 3600,
  })

export const s3get = async ({ Bucket, Key }) => {
  return s3client.send(new GetObjectCommand({ Bucket, Key }))
}
