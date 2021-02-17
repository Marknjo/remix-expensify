import { json } from '@remix-run/node'
import { db } from '~/utils/db.server'

export default async function getAllExpenses(userId: string) {
  try {
    const expenses = await db.expense.findMany({ where: { userId } })
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
