import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { FaLock } from 'react-icons/fa'
import { Link, useNavigation } from 'react-router-dom'
import type { IAuthValidationErrors } from '~/types'

export enum EAuthModes {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

function AuthForm() {
  const navigation = useNavigation()
  const [searchQuery] = useSearchParams()
  const validationErrors = useActionData<IAuthValidationErrors>()

  // form state
  const mode = searchQuery.get('mode') || EAuthModes.SIGN_IN
  const transformedMode = mode
    .toLocaleUpperCase()
    .replace('-', '_') as keyof typeof EAuthModes

  const authMode = EAuthModes[transformedMode] || EAuthModes.SIGN_IN

  // submission state
  const isSubmitting = navigation.state !== 'idle'

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        <FaLock />
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button type="submit" disabled={Boolean(isSubmitting)}>
          {isSubmitting
            ? EAuthModes.SIGN_UP === authMode
              ? 'Creating Account...'
              : 'Signing in...'
            : EAuthModes.SIGN_UP === authMode
            ? 'Sign Up'
            : 'Sign In'}
        </button>
        <Link
          to={{
            pathname: '/auth',
            search: `mode=${
              EAuthModes.SIGN_IN === authMode
                ? EAuthModes.SIGN_UP
                : EAuthModes.SIGN_IN
            }`,
          }}
        >
          {EAuthModes.SIGN_UP === authMode
            ? 'Log in with existing user'
            : "Don't have an account, Sign Up"}
        </Link>
      </div>
    </Form>
  )
}

export default AuthForm
