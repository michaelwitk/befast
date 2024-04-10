'use client'

import { useState } from 'react'
import { form_s3 } from './actions'

export default () => {
  const [done, set_done] = useState(false)

  return (
    <div>
      <form
        action={async (form) => {
          let file = form.get('file')

          let { Bucket, Key, aws } = await form_s3(file.name, file.type)

          let body = new FormData()
          Object.keys(aws.fields).forEach((key) => {
            body.append(key, aws.fields[key])
          })

          body.append('file', file)

          let res = await fetch(aws.url, {
            method: 'POST',
            body,
          })

          if (res.ok) set_done({ Bucket, Key })
        }}
      >
        <input type="file" name="file" />
        <button>upload</button>
      </form>

      {done && (
        <div>
          <br />
          <div>
            Media downloaded from S3 ({done.Bucket}/{done.Key})
          </div>
          <img src={`http://localhost:9000/${done.Bucket}/${done.Key}`} />
        </div>
      )}
    </div>
  )
}
