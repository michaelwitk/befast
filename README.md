<p align="center">
    <a href="https://selfhostnext.com">
        <h3 align="center">selfhostnext</h3>
    </a>
</p>

<p align="center">
    on your server. <a href="#how-to-install"><strong>Why?</strong></a>
</p>

<p align="center">
  <a href="#how-to-install"><strong>install</strong></a> ·
  <a href="https://selfhostnext.com/docs"><strong>docs</strong></a> ·
  <a href="https://selfhostnext.com/changelog"><strong>changelog</strong></a> ·
  <a href="#nextjs-examples"><strong>examples</strong></a> ·
  <a href="https://selfhostnext.com/docs/cli"><strong>cli</strong></a>
</p>

<a href="https://selfhostnext.com/discord"><img src="https://img.shields.io/discord/1221513687291003011?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
<a href="https://youtube.com/watch?v=dQw4w9WgXcQ"><img alt="YouTube Video Views" src="https://img.shields.io/youtube/views/dQw4w9WgXcQ">
</a>

```sh
npm i -g selfhostnext       # install cli

selfhostnext init EXAMPLE
cd EXAMPLE

selfhostnext deploy         # publish
```

## Next.js Examples

- [nextjs-cron-jobs](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-cron-jobs) - schedule
- [nextjs-mysql](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-mysql) - database
- [nextjs-redis](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-redis) - queues, rate limit, ...
- [nextjs-s3](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-s3) - storage, images, videos, ...
- [nextjs-ws](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-ws) - websocket
- [nextjs-socket.io](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-socket.io) - websocket w/ cookie

## How to Install

[Watch the complete process on YouTube.com](https://youtube.com)

1. **Pick a machine to host.** Select **Ubuntu LTS 22.04** as the operating system, and make sure at least **2GB/1CPU** is chosen. We recommend [DigitalOcean\*](https://cloud.digitalocean.com/droplets/new?i=182186&fleetUuid=05f9d4e2-246a-4157-b38a-9fc6ffa01356&distro=ubuntu&distroImage=ubuntu-22-04-x64&region=sfo3&size=s-1vcpu-2gb-amd) using the link provided you get $200 for the next 60 days for free. We personally use a 2GB/2CPU machine to host a few projects on a single machine. hetzner.com, cloud.oracle.com are worth checking out too!
2. **Point DNS to IP address of this machine.** Buy a domain (example.com) on [Namecheap](https://namecheap.com). Don't worry about SSL, it will be installed by selfhostnext. After purchase, click on **Manage**, then **Advanced DNS**, and enter **Host Records** as shown below. Replace 1.1.1.1 with your **machines IP address from step 1.**

```
Type        Host    Value
---         ---     ---
A Record    @       1.1.1.1
A Record    *       1.1.1.1
```

3. **Connect a terminal to the machine.**
4. **Install with one command.** Paste the command from your purchase, received via email, into the terminal on your server.

[Watch the complete process on YouTube.com](https://youtube.com)

## Why?

- Same workflow you already love.
- No asterik on free\*
- Drop in replacement. Keep your code as-is.
- No arbitrary limits.
- Billing without surprises.
- The alternative you've been waiting for.
- Built-in storage, one-click start, or defined in code.
- Better performance, data closer to code.
- Private.
- Escape hatch. You too should have an exit strategy.
