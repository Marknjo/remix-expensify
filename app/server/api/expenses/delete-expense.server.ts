import { db } from '~/utils/db.server'

export default async function deleteExpense(id: string, userId: string) {
  try {
    await db.expense.delete({ where: { id, userId } })
  } catch (error) {
    throw new Error(`Failed to delete expense with the id ${id}`)
  }
}
