import type { User } from '@prisma/client'
import { json, type ActionArgs, type LinksFunction } from '@remix-run/node'
import AuthForm, { EAuthModes } from '~/components/auth/AuthForm'
import { createUser, validateAuthInputs } from '~/server'
import authStyles from '~/styles/auth.css'

// meta

// links
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: authStyles },
]

// actions
export async function action({ request }: ActionArgs) {
  const query = new URL(request.url).searchParams
  const inputData = await request.formData()
  const authInputs = Object.fromEntries(inputData)

  const mode = query.get('mode')
  const authMode = mode ?? EAuthModes.SIGN_IN

  // handle sign-in
  if (authMode === EAuthModes.SIGN_IN) {
    // @TODO: Handle signin
  }

  // handle sign-up
  if (authMode === EAuthModes.SIGN_UP) {
    const newUserInputs = authInputs as unknown as Pick<
      User,
      'name' | 'email' | 'password'
    >
    // add validations
    try {
      validateAuthInputs(newUserInputs)
    } catch (error) {
      return error
    }

    try {
      // sign-up user
      return createUser(newUserInputs)
    } catch (error) {
      throw json(
        {
          message:
            error instanceof Error ? error.message : 'Failed to sign up user',
        },
        {
          status: 500,
          statusText: 'Server Error',
        },
      )
    }
  }

  return null
}

// loaders

// page component
export default function AuthPage() {
  return (
    <main>
      <AuthForm />
    </main>
  )
}
