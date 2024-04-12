'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { limit_jobs } from '../../libs/limiter'
import { queue } from '../../libs/queue'

export const action = async (text) => {
  'use server'

  let ip = headers().get('x-real-ip') ?? '127.0.0.1'
  console.log({ ip })
  const { error, success } = await limit_jobs(ip)

  if (!success) {
    return {
      error: {
        code: 'RATE_LIMIT',
        message: 'Too many attempts. Try again later',
        retry_in: Math.ceil(error.msBeforeNext / 1000),
      },
    }
  }

  await queue('fifo', { text })

  redirect('/job-processing/status')
}
