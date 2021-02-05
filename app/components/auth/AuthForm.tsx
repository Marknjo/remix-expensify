import { Form, useActionData, useSearchParams } from '@remix-run/react'
import { FaLock, FaUserPlus } from 'react-icons/fa'
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
  const isSignUp = authMode === EAuthModes.SIGN_UP

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">{isSignUp ? <FaUserPlus /> : <FaLock />}</div>

      {isSignUp && (
        <p>
          <label htmlFor="name">Username</label>
          <input type="name" id="name" name="name" required />
        </p>
      )}

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
            ? isSignUp
              ? 'Creating Account...'
              : 'Signing in...'
            : isSignUp
            ? 'Sign Up'
            : 'Sign In'}
        </button>
        <Link
          to={{
            pathname: '/auth',
            search: `mode=${
              isSignUp ? EAuthModes.SIGN_IN : EAuthModes.SIGN_UP
            }`,
          }}
        >
          {isSignUp
            ? 'Log in with existing user'
            : "Don't have an account, Sign Up"}
        </Link>
      </div>
    </Form>
  )
}

export default AuthForm
