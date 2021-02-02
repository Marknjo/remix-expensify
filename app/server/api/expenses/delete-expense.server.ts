import { db } from '~/utils/db.server'

export default async function deleteExpense(id: string) {
  try {
    await db.expense.delete({ where: { id } })
  } catch (error) {
    throw new Error(`Failed to delete expense with the id ${id}`)
  }
}
