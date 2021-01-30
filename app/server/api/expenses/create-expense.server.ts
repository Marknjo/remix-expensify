/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unused-vars */
import { json } from '@remix-run/node'
import type { INewExpense } from '~/types'
import { db } from '~/utils/db.server'

export default async function createExpense(newExpense: INewExpense) {
  try {
    await db.expense.create({
      data: {
        title: newExpense.title,
        amount: +newExpense.amount,
        date: new Date(newExpense.date),
        currency: 'en-KE',
      },
    })
  } catch (error) {
    console.log(error)

    throw json(
      { message: 'Error creating add this expense' },
      {
        status: 500,
        statusText: 'Server Error',
      },
    )
  }
}
