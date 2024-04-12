'use client'

import { useState } from 'react'
import { action } from './action'

export default () => {
  let [error, set_error] = useState({})

  return (
    <div>
      <form
        // key={Math.random()}
        onSubmit={async (event) => {
          event.preventDefault()

          let form = new FormData(event.target)
          const text = form.get('text')

          const { error } = await action(text)
          set_error(error)
        }}
      >
        <input type="text" name="text" />
        <button>enqueue job</button>
        {error?.code && (
          <>
            <p>{error.code}</p>
            <p>{error.message}</p>
            <p>retry_in {error.retry_in} seconds</p>
          </>
        )}
      </form>
    </div>
  )
}
