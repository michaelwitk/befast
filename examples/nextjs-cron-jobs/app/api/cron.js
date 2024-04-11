console.log(process.argv)
const [_node, _file, path] = process.argv

let url = `http://${process.env.SELFHOST_NAME}.web:3000${path}`

console.log(process.env)
console.log(url)
let res = await fetch(url, {
  headers: {
    authorization: `Bearer ${process.env.SECRET}`,
  },
})
if (!res.ok) process.exit(1)
