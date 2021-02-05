import { Form, useSearchParams } from '@remix-run/react'
import { FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export enum EAuthModes {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

function AuthForm() {
  const [searchQuery] = useSearchParams()

  const mode = searchQuery.get('mode') || EAuthModes.SIGN_IN
  const transformedMode = mode
    .toLocaleUpperCase()
    .replace('-', '_') as keyof typeof EAuthModes

  const authMode = EAuthModes[transformedMode] || EAuthModes.SIGN_IN

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
      <div className="form-actions">
        <button>
          {EAuthModes.SIGN_UP === authMode ? 'Sign Up' : 'Sign In'}
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
