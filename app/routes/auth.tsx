import type { LinksFunction } from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import authStyles from '~/styles/auth.css'

// meta

// links
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: authStyles },
]

// actions

// loaders

// page component
export default function AuthPage() {
  return (
    <main>
      <AuthForm />
    </main>
  )
}
