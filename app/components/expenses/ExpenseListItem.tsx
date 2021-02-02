import type { SyntheticEvent } from 'react'
import { Link, useFetcher } from '@remix-run/react'
import type { Expense } from '@prisma/client'
import { formatCurrency } from '../utils/format-currency'

function ExpenseListItem({ title, amount, id, locale, currencyCode }: Expense) {
  const fetcher = useFetcher()

  function deleteExpenseItemHandler(event: SyntheticEvent) {
    event.preventDefault()

    fetcher.submit(null, {
      method: 'DELETE',
      action: `/expenses/${id}`,
    })
  }
  const isDeleting = fetcher.state !== 'idle'

  if (isDeleting) {
    return (
      <section className="expense-item">
        <p>Deleting {title} expense (...)</p>
      </section>
    )
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
        <fetcher.Form method="delete">
          <button
            type="submit"
            onClick={deleteExpenseItemHandler}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : ' Delete'}
          </button>
        </fetcher.Form>

        <Link to={`/expenses/${id}`}>Edit</Link>
      </menu>
    </article>
  )
}

export default ExpenseListItem
