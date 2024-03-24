let [_node, _path, ...args] = process.argv

let [command, ...command_args] = args

if (command === 'domain') {
  let [domain] = command_args
  console.log(domain)
}

if (command === 'login') {
  let [token] = command_args
  console.log('login', token)

  if (!token) {
    console.log('missing token')
    // press enter to open url

    // await fetch(``)
  }
}
