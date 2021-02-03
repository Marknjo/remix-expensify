import type { Expense } from '@prisma/client'
import ExpenseListItem from './ExpenseListItem'
import { Link } from '@remix-run/react'
import { FaPlus } from 'react-icons/fa'

function ExpensesList({ expenses }: { expenses: Expense[] }) {
  if (!expenses || expenses.length === 0) {
    return (
      <article className="expenses__no-expense">
        <section>
          <p>😟 Oops! Looks like you do not have any expenses yet!</p>
          <p>
            <Link to="add">
              <div>
                <span>Add New Expense</span> <FaPlus />
              </div>
            </Link>
          </p>
        </section>
      </article>
    )
  }

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
