import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { prisma } from '../libs/prisma'

export default async () => {
  noStore()

  let todos = []
  // await prisma.todo.findMany({
  //   orderBy: { createdAt: 'desc' },
  // })

  return (
    <div>
      <form
        action={async (form) => {
          'use server'

          let title = form.get('title')
          let done = form.get('done') === 'on'
          console.log(title)
          console.log(done)

          revalidatePath('/')
        }}
      >
        <div style={{ display: 'flex' }}>
          <input type="text" name="title" />
          <label style={{ display: 'flex' }}>
            <input type="checkbox" name="done" />
            <div>done</div>
          </label>
          <button>add todo</button>
        </div>
      </form>

      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.title}</div>
          <div>{todo.done ? 'done' : 'not done'}</div>
        </div>
      ))}
    </div>
  )
}
