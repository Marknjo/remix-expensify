import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import expensesStyles from '~/styles/expenses.css'

// meta

// links
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: expensesStyles },
]

// actions

// loaders

// page component
export default function ExpensesLayout() {
  return (
    <div>
      <h1>Base Layout</h1>
      <Outlet />
    </div>
  )
}
