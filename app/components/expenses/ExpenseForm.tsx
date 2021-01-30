import type { Expense } from '@prisma/client'
import { json } from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from '@remix-run/react'
import type { INewExpenseValidationsErrors } from '~/types'

function ExpenseForm() {
  const validationErrors = useActionData<INewExpenseValidationsErrors>()

  const loadDataFormPath = useMatches()
  const navigation = useNavigation()
  const param = useParams()

  const data = loadDataFormPath.find(
    route => route.id === 'routes/_app.expenses',
  )

  if (!data) {
    throw json(
      { message: `Something happened when loading this page` },
      {
        status: 500,
        statusText: 'Not Found',
      },
    )
  }

  const expenseData = (data.data as Array<Expense>).find(
    expense => expense.id === param.id,
  )

  if (!expenseData || expenseData.id !== param.id) {
    throw json(
      { message: 'Invalid Id' },
      {
        status: 404,
        statusText: 'Invalid Id',
      },
    )
  }

  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10

  const isSubmitting = navigation.state !== 'idle'

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: new Date(expenseData.date).toISOString().slice(0, 10),
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

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button disabled={Boolean(isSubmitting)}>
          {expenseData
            ? isSubmitting
              ? 'Updating...'
              : 'Edit Expense'
            : isSubmitting
            ? 'Saving...'
            : 'Save Expense'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  )
}

export default ExpenseForm
