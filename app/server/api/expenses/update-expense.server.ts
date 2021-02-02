import type { Expense } from '@prisma/client'
import { db } from '~/utils/db.server'

export default async function updateExpense(
  updates: Partial<Expense>,
  id: string,
) {
  try {
    return await db.expense.update({
      where: {
        id,
      },
      data: {
        ...updates,
        ...(updates.amount ? { amount: +updates.amount } : {}),
        ...(updates.date ? { date: new Date(updates.date) } : {}),
      },
    })
  } catch (error) {
    throw new Error(`Could not update expense with id ${id}`)
  }
}
