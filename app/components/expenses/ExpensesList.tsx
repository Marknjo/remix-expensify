import type { Expense } from '@prisma/client'
import ExpenseListItem from './ExpenseListItem'

function ExpensesList({
  expenses,
}: {
  expenses: Omit<Expense, 'createdAt'>[]
}) {
  return (
    <ol id="expenses-list">
      {expenses.map(expense => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  )
}

export default ExpensesList
