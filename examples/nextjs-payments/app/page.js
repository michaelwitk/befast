import { unstable_noStore as noStore } from 'next/cache'

export default async () => {
  noStore()
  let VERCEL_GIT_COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA

  return (
    <div>
      <div>{VERCEL_GIT_COMMIT_SHA}</div>
      {/* <form
        action={async () => {
          'use server'
        }}
      >
        <button>create product</button>
      </form> */}

      <a href="https://buy.stripe.com/test_6oE5kD88g2Sk2Vq5kk">
        buy via stripe
      </a>
      <a href="https://mwit.lemonsqueezy.com/buy/f415500e-b6c5-4efd-b17a-becad18587b4">
        buy via lemonsqueezy
      </a>
    </div>
  )
}
