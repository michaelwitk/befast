import { randomUUID } from 'crypto'
import { sign, verify } from 'jsonwebtoken'
import { headers, cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '../libs/cookie'

export default async () => {
  let data
  try {
    data = verify(cookies().get(COOKIE_NAME).value, process.env.SECRET)
  } catch (error) {
    console.error(error)
  }

  return (
    <div>
      <Anonymous />
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
      <MagicLink />
    </div>
  )
}

const Anonymous = () => {
  return (
    <>
      <form
        action={async () => {
          'use server'
          const uuid = randomUUID()
          let day = 60 * 60 * 24

          let jwt = sign({ uuid }, process.env.SECRET, { expiresIn: day })
          cookies().set(COOKIE_NAME, jwt, {
            secure: true,
            httpOnly: true,
          })

          revalidatePath('/')
        }}
      >
        <button>set cookie</button>
      </form>
      <form
        action={async () => {
          'use server'
          cookies().delete(COOKIE_NAME)

          revalidatePath('/')
        }}
      >
        <button>delete cookie</button>
      </form>
    </>
  )
}

const MagicLink = () => {
  return (
    <form
      key={Math.random()}
      action={async (form) => {
        'use server'

        let origin = headers().get('origin')

        let email = form.get('email')
        const uuid = randomUUID()
        let day = 60 * 60 * 24

        let jwt = sign({ uuid, email, verified: false }, process.env.SECRET, {
          expiresIn: day,
        })

        cookies().set(COOKIE_NAME, jwt, {
          secure: true,
          httpOnly: true,
        })

        let verified = sign(
          { uuid, email, verified: true },
          process.env.SECRET,
          {
            expiresIn: day,
          }
        )
        let url_verification = `${origin}/api/email_verify?jwt=${verified}`

        // this should be sent via email, see example
        // befast init nextjs-email
        console.log({ email, url_verification })

        redirect(`/inbox?link=${url_verification}`)
      }}
    >
      <input type="email" name="email" placeholder="hello@example.com" />
      <button>Create Magic Link</button>
    </form>
  )
}
