import { unstable_noStore as noStore } from 'next/cache'

import { queues } from '../../../libs/queue'

export default async () => {
  noStore()

  const resuable = async (queue) => {
    let getActive = await queue.getActive()
    let getActive_len = getActive.length
    getActive = getActive.map((job) => <div key={job.id}>{job.id}</div>)

    let getCompleted = await queue.getCompleted(0, 1000)
    let getCompleted_len = getCompleted.length
    getCompleted = getCompleted.map((job) => (
      <div key={job.id}>
        <pre>{JSON.stringify(job, null, 4)}</pre>
      </div>
    ))

    let getWaiting = await queue.getWaiting(0, 1000)
    let getWaiting_len = getWaiting.length
    getWaiting = getWaiting.map((job) => <div key={job.id}>{job.id}</div>)

    let getFailed = await queue.getFailed(0, 1000)
    let getFailed_len = getFailed.length
    getFailed = getFailed.map((job) => <div key={job.id}>{job.id}</div>)

    return (
      <>
        <div>active {getActive_len}</div>
        <div>{getActive}</div>
        <br />

        <div>getCompleted {getCompleted_len}</div>
        <div>{getCompleted}</div>
        <br />

        <div>waiting {getWaiting_len}</div>
        <div>{getWaiting}</div>
        <br />

        <div>getFailed {getFailed_len}</div>
        <div>{getFailed}</div>
        <br />
      </>
    )
  }

  return (
    <div>
      <form>
        <button>refresh page</button>
      </form>
      <div>{await resuable(queues.fifo)}</div>
    </div>
  )
}
