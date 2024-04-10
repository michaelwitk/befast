'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

let host
if (process.env.NODE_ENV !== 'production') host = 'localhost:4000'
export let socket = io(host, { withCredentials: true })

export default () => {
  const [arr, set_arr] = useState([])
  useEffect(() => {
    let on_broadcast = [
      'broadcast',
      (data) => set_arr((arr) => [data, ...arr].slice(0, 10)),
    ]
    let on_news = [
      'news',
      (data) => set_arr((arr) => [data, ...arr].slice(0, 10)),
    ]
    socket.on(...on_broadcast)
    socket.on(...on_news)

    return () => {
      socket.off(...on_broadcast)
      socket.off(...on_news)
    }
  }, [])

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          let url = `${window.location.href}api/cookie`
          await fetch(url, { method: 'POST' })
        }}
      >
        set cookie
      </button>
      <button
        type="button"
        onClick={async () => {
          let url = `${window.location.href}api/cookie`
          await fetch(url, { method: 'DELETE' })
        }}
      >
        delete cookie
      </button>

      <button
        type="button"
        onClick={async () => {
          let url = `${window.location.href}socket.io/`
          if (host) url = 'http://localhost:4000'
          await fetch(url)
        }}
      >
        broadcast
      </button>
      <button
        type="button"
        onClick={() => {
          socket.emit('javascript', { now: Date.now() })
        }}
      >
        send to ws-server
      </button>

      <pre>{JSON.stringify({ arr }, null, 4)}</pre>
    </div>
  )
}
