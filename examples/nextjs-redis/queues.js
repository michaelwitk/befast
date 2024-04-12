import { worker } from './libs/queue'

const workers = [
  worker('fifo'), //
]

const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}, closing server...`)

  let closed = workers.map((worker) => worker.close())
  await Promise.all(closed)
  console.log('closed')

  process.exit(0)
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'))
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

process.on('uncaughtException', function (error) {
  console.error(error, 'Uncaught exception')
})

process.on('unhandledRejection', (reason, promise) => {
  console.error({ promise, reason }, 'Unhandled Rejection at: Promise')
})
