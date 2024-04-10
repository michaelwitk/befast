import { readJSON } from 'fs-extra'

export default async () => {
  const { version } = await readJSON('./package.json')
  const built_at = new Date().toISOString()

  return (
    <div>
      <div>👋 {version}</div>
      <div>🕐 {built_at}</div>
    </div>
  )
}
