import { redirect, type LinksFunction, type LoaderArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import { isLoggedIn } from '~/server'

import expensesStyles from '~/styles/expenses.css'

// links

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: expensesStyles },
]

// loader
export async function loader({ request }: LoaderArgs) {
  const userId = await isLoggedIn(request)

  if (userId) {
    return null
  }

  return redirect('/auth')
}

// layout
export default function AppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  )
}
