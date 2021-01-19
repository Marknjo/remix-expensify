import type { Expense } from '@prisma/client'

const DUMMY_EXPENSES: Array<Omit<Expense, 'createdAt'>> = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString() as unknown as Date,
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 16.99,
    date: new Date().toISOString() as unknown as Date,
  },
]

export default DUMMY_EXPENSES
