import { redirect, type LoaderFunction } from '@remix-run/node'
import { getExpenses, isLoggedIn } from '~/server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await isLoggedIn(request)

  if (!userId) {
    return redirect('/auth')
  }

  try {
    return getExpenses(userId)
  } catch (error) {
    throw error
  }
}
