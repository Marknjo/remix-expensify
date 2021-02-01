import type { Expense } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { getExpenses } from '~/server'

// meta

// loader
export const loader: LoaderFunction = async () => {
  try {
    return getExpenses()
  } catch (error) {
    throw error
  }
}

// page component
export default function ExpensesAnalysisPage() {
  const expenses: Array<Expense> = useLoaderData<typeof loader>()

  if (!expenses) {
    return
  }

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  )
}
