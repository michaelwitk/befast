export default () => {
  if (process.env.NODE_ENV !== 'production')
    return (
      <div>
        Development
        <br />
        Check your server logs and visit that URL.
      </div>
    )

  return (
    <div>
      Email sent!
      <br />
      Check your Inbox and click the link on the device you want to sign in.
    </div>
  )
}
