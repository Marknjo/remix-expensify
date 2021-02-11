import type { LoaderArgs } from '@remix-run/node'
import { sessionStorage } from './sessions-utils.server'

export default async function isLoggedIn(request: LoaderArgs['request']) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  const userId = session.get('userId')

  if (!userId) return null

  return userId
}
