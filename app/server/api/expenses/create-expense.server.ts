/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unused-vars */
import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { INewExpense } from '~/types'
import { db } from '~/utils/db.server'
import isLoggedIn from '../auth/is-logged-in.server'

export default async function createExpense(
  newExpense: INewExpense,
  request: ActionArgs['request'],
) {
  try {
    const loggedInUser = await isLoggedIn(request)

    await db.expense.create({
      data: {
        title: newExpense.title,
        amount: +newExpense.amount,
        date: new Date(newExpense.date),
        userId: loggedInUser,

        /// @TODO: use user settings to se currency details
        locale: 'en-KE',
        currencyCode: 'KES',
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
