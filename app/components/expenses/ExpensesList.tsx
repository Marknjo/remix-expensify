import type { Expense } from '@prisma/client'
import ExpenseListItem from './ExpenseListItem'

function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <ol id="expenses-list">
      {expenses.map(expense => (
        <li key={expense.id}>
          <ExpenseListItem {...expense} />
        </li>
      ))}
    </ol>
  )
}

export default ExpensesList
