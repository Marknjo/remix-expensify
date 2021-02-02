import { Form, Link } from '@remix-run/react'
import type { Expense } from '@prisma/client'
import { formatCurrency } from '../utils/format-currency'

function ExpenseListItem({ title, amount, id, locale, currencyCode }: Expense) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">
          {formatCurrency(amount, locale, currencyCode)}
        </p>
      </div>
      <menu className="expense-actions">
        <Form action={`/expenses/${id}`} method="delete">
          <button type="submit" onClick={deleteExpenseItemHandler}>
            Delete
          </button>
        </Form>

        <Link to={`/expenses/${id}`}>Edit</Link>
      </menu>
    </article>
  )
}

export default ExpenseListItem
