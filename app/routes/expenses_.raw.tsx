import type { LoaderFunction } from '@remix-run/node'
import { getExpenses } from '~/server'

export const loader: LoaderFunction = async () => {
  try {
    return getExpenses()
  } catch (error) {
    throw error
  }
}
