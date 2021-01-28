import type { Expense } from '@prisma/client'
import { Form, Link, useLoaderData } from '@remix-run/react'

function ExpenseForm() {
  const expenseData = useLoaderData<Expense>()

  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: '',
        amount: '',
        date: '',
      }

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues.date}
          />
        </p>
      </div>

      <div className="form-actions">
        <button>'Save Expense'</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  )
}

export default ExpenseForm
