import { Link } from '@remix-run/react'
import type { Expense } from '@prisma/client'

function ExpenseListItem({ title, amount, id, locale, currencyCode }: Expense) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={`/expenses/${id}`}>Edit</Link>
      </menu>
    </article>
  )
}

export default ExpenseListItem
