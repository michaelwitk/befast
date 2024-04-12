import Redis from 'ioredis'
import { Queue, Worker } from 'bullmq'

import { post } from './auth'

let prefix = 'bull:queue'
const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
})

const options = { prefix, connection }
export const queues = {
  fifo: new Queue('fifo', options),
}

export const queue = async (name, data, opt = {}) => {
  let queue = queues[name]
  return queue.add('main', data, { attempts: 1, ...opt })
}

export const worker = (name, concurrency = 1) => {
  let queue = queues[name]

  queue.on('completed', ({ jobId }) => {
    console.log(name, 'done', jobId)
  })
  queue.on('failed', ({ jobId, failedReason }) => {
    console.error(name, 'error', failedReason, jobId)
  })
  queue.on('error', (err) => {
    console.error(err)
  })

  return new Worker(
    name,
    async ({ id, data }) => {
      let json = await post(`/api/${name}`, data)
      console.log(json)
      return json
    },
    { concurrency, connection, prefix }
  )
}
