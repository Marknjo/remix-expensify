import { redirect } from '@remix-run/node'
import type { LoaderArgs, ActionFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import invariant from 'tiny-invariant'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/ui/Modal'
import { createExpense, isLoggedIn, validateExpenseInput } from '~/server'
import type { INewExpense, INewExpenseValidationsErrors } from '~/types'

// meta

// action

export const action: ActionFunction = async ({ request }) => {
  const formData: FormData = await request.formData()

  const rawExpense = Object.fromEntries(formData)

  // handle type validations
  invariant(typeof rawExpense.title === 'string', 'Title must be a string')

  invariant(typeof +rawExpense.amount === 'number', 'Title must be a number')

  invariant(typeof rawExpense.date === 'string', 'Title must be a number')

  const newExpense = rawExpense as unknown as INewExpense
  // handle inputs validations

  try {
    validateExpenseInput(newExpense)
  } catch (error) {
    return error as INewExpenseValidationsErrors
  }

  // save to db
  try {
    await createExpense(newExpense)
  } catch (error) {
    console.log(error)

    // throw error
  }

  // redirect to /expenses
  return redirect('..')
}

// loader
export async function loader({ request }: LoaderArgs) {
  const userId = await isLoggedIn(request)

  if (userId) {
    return null
  }

  return redirect('/auth')
}

// page component
export default function AddExpensePage() {
  const navigate = useNavigate()

  function closeHandler() {
    navigate('..')
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  )
}
