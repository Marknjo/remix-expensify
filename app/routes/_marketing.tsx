import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import marketingStyles from '~/styles/marketing.css'

// meta

// links
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: marketingStyles },
]

export default function MarketingLayout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
