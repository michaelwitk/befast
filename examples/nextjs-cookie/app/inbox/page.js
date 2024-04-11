import { unstable_noStore as noStore } from 'next/cache'

let message = 'Send real emails in production.'

export default ({ searchParams }) => {
  if (process.env.NODE_ENV === 'production') throw new Error(message)

  noStore()

  return (
    <div>
      <div>Verification Link: </div>
      <a href={searchParams.link}>{searchParams.link}</a>
      <br />
      <br />
      <br />
      <div>{message}</div>
      <pre>befast init nextjs-email</pre>
    </div>
  )
}
