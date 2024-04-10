import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { prisma } from '../libs/prisma'

export default async () => {
  noStore()

  let rows = await prisma.$queryRaw`SELECT COUNT(*) FROM todo`
  let todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <form
        action={async (form) => {
          'use server'

          let title = form.get('title')
          let done = form.get('done') === 'on'

          await prisma.todo.create({
            data: {
              title,
              done,
            },
          })

          revalidatePath('/')
        }}
      >
        <div style={{ display: 'flex' }} key={Math.random()}>
          <input type="text" name="title" />
          <label style={{ display: 'flex' }}>
            <input type="checkbox" name="done" />
            <div>done</div>
          </label>
          <button>add todo</button>
        </div>
      </form>

      <div>todo {JSON.stringify({ rows })}</div>
      {todos.map((todo) => (
        <div key={todo.id} style={{ display: 'flex' }}>
          <div style={{ paddingRight: '5px' }}>{todo.done ? '✅' : 'X'}</div>

          <div>{todo.title}</div>
        </div>
      ))}
    </div>
  )
}
