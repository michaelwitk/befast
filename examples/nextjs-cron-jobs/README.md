# nextjs-cron-jobs

Minimal example of using Cron Jobs with Next.js.

```json
// app.json
{
  "cron": [
    {
      "command": "npm run start:cron -- /api/console_log?text=called_every_5_minutes",
      "schedule": "*/5 * * * *"
    },
    {
      "command": "npm run start:cron -- /api/console_log?text=called_every_11_minutes",
      "schedule": "*/11 * * * *"
    }
  ]
}
```

```
# development
npm run dev

# production
befast deploy
```
