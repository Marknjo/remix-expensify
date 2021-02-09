import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { isProd } from '~/utils/constants'

const sessionSecret = process.env.SESSION_SECRET!
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: isProd,
    secrets: [sessionSecret],
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: isProd,
  },
})

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession()

  session.set('userId', userId)

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}

export { sessionStorage, createUserSession }
