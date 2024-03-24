<p align="center">
    <a href="https://selfhostnext.com">
        <h3 align="center">selfhostnext</h3>
    </a>
</p>

<p align="center">
    on your server. <a href="#how to install"><strong>Why?</strong></a>
</p>

<p align="center">
  <a href="#how to install"><strong>install</strong></a> ·
  <a href="https://selfhostnext.com/docs"><strong>docs</strong></a> ·
  <a href="https://selfhostnext.com/changelog"><strong>changelog</strong></a> ·
  <a href="https://selfhostnext.com/templates"><strong>examples</strong></a> ·
  <a href="https://selfhostnext.com/docs/cli"><strong>cli</strong></a>
</p>

![Discord](https://img.shields.io/discord/1221513687291003011)

```sh
npm i -g selfhostnext       # install cli

selfhostnext init EXAMPLE
cd EXAMPLE

selfhostnext deploy         # publish
```

## Next.js Examples

- [nextjs-cron-jobs - schedule](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-cron-jobs)
- [nextjs-mysql - database](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-mysql)
- [nextjs-redis - queues, rate limit, ...](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-redis)
- [nextjs-s3 - storage, images, videos, ...](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-s3)
- [nextjs-ws - websocket](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-ws)
- [nextjs-socket.io - websocket w/ cookie](https://github.com/michaelwitk/selfhostnext/tree/main/examples/nextjs-socket.io)

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

<img src="youtube.png" height="96">

[Watch the complete process on YouTube.com](https://youtube.com)

## Why?

- Same workflow you already love.
- No arbitrary limits.
- Billing without surprises.
- Not held hostage by a single provider.
- Built-in storage, one-click start.
- Better performance, data closer to code.
- Private.
- Escape hatch. You too should have an exit strategy.
