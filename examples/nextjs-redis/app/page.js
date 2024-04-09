import { unstable_noStore as noStore } from 'next/cache'

import { redis } from '../libs/redis'

export default async () => {
  noStore()

  let counter = await redis.incr('counter')

  return (
    <div>
      <pre>{JSON.stringify({ counter })}</pre>

      <form>
        <button>refresh page</button>
      </form>
    </div>
  )
}
