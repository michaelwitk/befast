import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

const storeClient = new Redis(process.env.REDIS_URL, {
  keyPrefix: 'nextjs-redis-limiter',
})

const rethrow = (error) => {
  if (error instanceof Error) throw error
  return { error, success: false }
}

export const limit_jobs = async (key) =>
  new RateLimiterRedis({
    storeClient,
    points: 1,
    duration: 60,
    keyPrefix: 'limit_jobs',
  })
    .consume(key)
    .then(() => ({ success: true }))
    .catch(rethrow)
