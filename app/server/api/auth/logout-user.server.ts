import { redirect } from '@remix-run/node'
import type { ActionArgs } from '@remix-run/node'
import { sessionStorage } from './sessions-utils.server'

export default async function logoutUser(request: ActionArgs['request']) {
  try {
    const session = await sessionStorage.getSession(
      request.headers.get('Cookie'),
    )

    return redirect('/', {
      headers: {
        'Set-Cookie': await sessionStorage.destroySession(session),
      },
    })
  } catch (error) {
    throw new Error('Failed to logout user')
  }
}
