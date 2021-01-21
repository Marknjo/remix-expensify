import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import ExpensesHeader from '~/components/navigation/ExpensesHeader'

import expensesStyles from '~/styles/expenses.css'

// links

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: expensesStyles },
]

// layout
export default function AppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  )
}
