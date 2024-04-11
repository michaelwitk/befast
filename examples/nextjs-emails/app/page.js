import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default () => {
  return (
    <form
      action={async (form) => {
        'use server'
        let url = headers().get('origin')
        let service = form.get('service')

        let From = form.get('From')
        let To = form.get('To')
        let Subject = form.get('Subject')
        let TextBody = form.get('TextBody')

        url = `${url}${service}`

        console.log(url)
        let res = await fetch(url, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${process.env.SECRET}`,
          },
          body: JSON.stringify({
            From,
            To,
            Subject,
            TextBody,
          }),
        })

        if (res.ok) redirect('/sent')
        else redirect('/error')
      }}
    >
      <div>From:</div>
      <input type="text" name="From" defaultValue="sender@example.com" />
      <br />
      <div>To:</div>
      <input type="text" name="To" defaultValue="recipient@example.com" />
      <br />
      <div>Subject:</div>
      <input type="text" name="Subject" defaultValue="Test" />
      <br />
      <div>TextBody:</div>
      <input type="text" name="TextBody" defaultValue="Hello" />

      <br />
      <br />

      <div>Send through:</div>
      <label>
        <input
          defaultChecked
          type="radio"
          name="service"
          value="/api/emails/resend"
        />
        resend.com
      </label>
      <br />

      <label>
        <input type="radio" name="service" value="/api/emails/postmark" />
        postmarkapp.com
      </label>

      <br />
      <br />
      <button>Send Email</button>
    </form>
  )
}
