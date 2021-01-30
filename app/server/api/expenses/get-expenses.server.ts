import { json } from '@remix-run/node'
import { db } from '~/utils/db.server'

export default async function getAllExpenses() {
  try {
    const expenses = await db.expense.findMany()
    return expenses
  } catch (error) {
    throw json(
      {
        message: 'Failed to load all expenses',
      },
      {
        status: 500,
        statusText: 'Server Error',
      },
    )
  }
}
