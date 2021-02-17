import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { FaDownload, FaPlus } from 'react-icons/fa'
import ExpensesList from '~/components/expenses/ExpensesList'
import { getExpenses, isLoggedIn } from '~/server'

// meta

// links

// actions

// loaders
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await isLoggedIn(request)

  if (!userId) {
    return redirect('/auth')
  }

  try {
    return getExpenses(userId)
  } catch (error) {
    throw error
  }
}

// Layout component
export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>()

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  )
}
