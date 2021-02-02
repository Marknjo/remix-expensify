import type { Expense } from '@prisma/client'
import { redirect, type ActionArgs, json } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'

import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/ui/Modal'
import { updateExpense, validateExpenseInput } from '~/server'
import type { INewExpense } from '~/types'

// meta

// action
export async function action({ request, params }: ActionArgs) {
  const method = request.method
  const id = params.id

  // edit request
  if (method === 'PATCH') {
    try {
      // handle form data
      const data = await request.formData()

      const updates = Object.fromEntries(data)

      const newUpdates = updates as unknown as Partial<Expense> | INewExpense

      // validation
      try {
        validateExpenseInput(newUpdates as INewExpense)
      } catch (error) {
        return error
      }

      // update field
      await updateExpense(newUpdates as Partial<Expense>, id!)

      return redirect('..')
    } catch (error) {
      throw json(
        {
          message:
            error instanceof Error
              ? error.message
              : 'Failed to update the expenses',
        },
        {
          status: 400,
          statusText: 'Invalid inputs',
        },
      )
    }
  }

  // delete request
  if (method === 'DELETE') {
    // @TODO:
  }

  return null
}

// page component
export default function ExpensePage() {
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
