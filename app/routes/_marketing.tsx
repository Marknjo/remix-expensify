import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import MainHeader from '~/components/navigation/MainHeader'
import { isLoggedIn } from '~/server'
import marketingStyles from '~/styles/marketing.css'

// meta

// links
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: marketingStyles },
]

// loader

export const loader: LoaderFunction = async ({ request }) => {
  return Boolean(await isLoggedIn(request))
}

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
