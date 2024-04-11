import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sign } from 'jsonwebtoken'
import { Resend } from 'resend'
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../libs/cookie'

export default () => {
  return (
    <div>
      <div>Login</div>
      <br />

      <form
        action={async (form) => {
          'use server'
          const origin = headers().get('origin')
          console.log({ origin })

          let email = form.get('email')
          console.log(email)

          let cookie = sign({ email, verified: false }, process.env.SECRET)
          let verify = sign({ email, verified: true }, process.env.SECRET)
          let url_verify = `${origin}/api/email_verify?jwt=${verify}`
          console.log({ url_verify })

          cookies().set(COOKIE_NAME, cookie, COOKIE_OPTIONS)

          if (process.env.NODE_ENV !== 'production') {
            redirect(`/login/email`)
          }

          let from = 'contact@befa.st'
          let subject = `Login example nextjs-payments`
          let text = `If this was not you making the login request, its safe to just ignore.\
Login by visiting this URL: <a href="${url_verify}">${url_verify}</a>`

          const resend = new Resend(process.env.RESEND)
          const { error } = await resend.emails.send({
            from: `Login <${from}>`,
            to: [email],
            subject,
            text,
          })

          if (error) {
            console.error(error)
            redirect(`/login/email/error`)
          }

          redirect(`/login/email`)
        }}
      >
        <label>
          Email
          <br />
          <input type="email" name="email" placeholder="hi@example.com" />
        </label>

        <br />
        <br />
        <button>Send Magic Link</button>
      </form>
    </div>
  )
}
