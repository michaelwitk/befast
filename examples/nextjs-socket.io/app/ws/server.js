import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import cookie from 'cookie'
import jsonwebtoken from 'jsonwebtoken'
import { COOKIE_NAME } from '../../lib/cookie'

export const get_count = (io, room) => {
  try {
    return io._nsps.get('/').adapter.rooms.get(room).size
  } catch (error) {
    console.error(error)
  }
  return 0
}

export const interval_count = (io) => {
  let count = io.engine.clientsCount

  setTimeout((_) => {
    if (count !== io.engine.clientsCount) {
      count = get_count(io)
      io.emit('count', count)
    }
  }, 1000 * 1)
}

let port = process.env.PORT || 4000

const options = {}

let domains = []
if (process.env.INTERNAL_DOMAINS_SUCCESS)
  domains = process.env.INTERNAL_DOMAINS_SUCCESS.split(',')

options.cors = {
  origin: [...domains],
  credentials: true,
}
if (process.env.NODE_ENV !== 'production')
  options.cors.origin.push(`http://localhost:3000`)

const app = express()
if (process.env.NODE_ENV !== 'production') app.use(cors())

const server = http.createServer(app)
const io = new Server(server, options)

// interal http routes
app.get('/', function (req, res) {
  io.emit('broadcast', { now: Date.now(), method: 'GET' })
  res.json({})
})
app.post('/', function (req, res) {
  io.emit('broadcast', { now: Date.now(), method: 'POST' })
  res.json({})
})

io.use(async (socket, next) => {
  let found
  try {
    let cookies = cookie.parse(socket.handshake.headers.cookie)
    found = cookies[COOKIE_NAME]
    console.log(cookies)
  } catch (error) {
    next()
    return
  }

  try {
    let { uuid } = jsonwebtoken.verify(found, process.env.SECRET)
    socket.uuid = uuid
    next()
  } catch (error) {
    next(error)
  }
})
io.on('connection', async (socket) => {
  console.log('user connected')
  console.log(socket.uuid)
  // console.log(socket)

  if (socket.uuid) socket.join('auth')
  else socket.join('noauth')

  let id = setInterval(() => {
    socket.emit('news', { now: Date.now() })
  }, 1000 * 1)

  socket.on('disconnect', function () {
    clearInterval(id)
    console.log('user disconnected')
  })

  socket.on('javascript', (data) => {
    console.log(data)

    let count_auth = get_count(io, 'auth')
    let count_noauth = get_count(io, 'noauth')
    socket.emit('news', { count_auth, count_noauth, data })
  })
})
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
  interval_count(io)
})
