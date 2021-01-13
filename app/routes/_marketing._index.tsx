import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Expensify' },
    {
      name: 'description',
      content: 'A simple bank manager with focus of expenses management',
    },
  ]
}

export default function Index() {
  return (
    <div>
      <h1>Expensify app</h1>
    </div>
  )
}
