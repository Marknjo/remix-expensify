import {
  Form,
  NavLink,
  useLoaderData,
  useLocation,
  useSearchParams,
} from '@remix-run/react'
import Logo from '../ui/Logo'
import { EAuthModes } from '../auth/AuthForm'

function MainHeader() {
  const isLoggedIn = useLoaderData()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || EAuthModes.SIGN_IN
  let transformedMode = mode
    .toLocaleUpperCase()
    .replace('-', '_') as keyof typeof EAuthModes

  const authMode = EAuthModes[transformedMode] || EAuthModes.SIGN_IN

  const isSignUp = EAuthModes.SIGN_UP === authMode

  const showLoginBtn =
    location.pathname === '/' || location.pathname === '/pricing'

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          {(isSignUp || EAuthModes.SIGN_IN === authMode) ?? (
            <li>
              <NavLink to="/expenses">Expenses</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to={{
                    pathname: '/auth',
                    search: `mode=${
                      isSignUp ? EAuthModes.SIGN_IN : EAuthModes.SIGN_UP
                    }`,
                  }}
                  className={`cta ${showLoginBtn ? 'cta--sign-up' : ''}`}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </NavLink>
              </li>

              {showLoginBtn && (
                <li>
                  <NavLink to="/auth" className="cta ">
                    Sign In
                  </NavLink>
                </li>
              )}
            </>
          )}

          {isLoggedIn && (
            <li>
              <Form action="/logout" method="delete">
                <button type="submit" className="cta">
                  Logout
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
