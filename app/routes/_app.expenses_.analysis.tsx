import type { Expense } from '@prisma/client'
import { redirect, type LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { getExpenses, isLoggedIn } from '~/server'

// meta

// loader
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await isLoggedIn(request)

  if (!userId) {
    return redirect('/auth')
  }

  try {
    return getExpenses()
  } catch (error) {
    throw error
  }
}

// page component
export default function ExpensesAnalysisPage() {
  const expenses: Array<Expense> = useLoaderData<typeof loader>()

  console.log('🚩🚩🚩', expenses)

  if (!expenses || expenses.length === 0) {
    return (
      <main className="analysis__no-expense">
        <section>
          <h1>Monthly Expenses</h1>
          <p>😟 Oops! Looks like you do not have expenses to analyze yet!</p>
          <p>
            Take me to <Link to="/expenses">New Expense &rarr;</Link>
          </p>
        </section>
      </main>
    )
  }

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  )
}
