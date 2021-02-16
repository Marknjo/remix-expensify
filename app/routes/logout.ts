import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { isLoggedIn, logoutUser } from '~/server'

export const action: ActionFunction = async ({ request }) => {
  try {
    return logoutUser(request)
  } catch (error) {
    throw json({
      message: error instanceof Error ? error.message : 'Logout failure',
    })
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  if (!(await isLoggedIn(request))) {
    return redirect('/auth')
  }

  return redirect('/expenses')
}
