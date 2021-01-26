import { redirect, type ActionFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import invariant from 'tiny-invariant'
import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/ui/Modal'
import type { INewExpense } from '~/types'

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

  // save to db
  console.log(newExpense)

  // redirect to /expenses
  return redirect('..')
}

// loader

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
