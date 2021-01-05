import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import type { V2_ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules'
import type { ReactNode } from 'react'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

function Document({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />

        {title && <title>{title}</title>}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export const ErrorBoundary: V2_ErrorBoundaryComponent = () => {
  const error = useRouteError()
  const isDev = process.env.NODE_ENV === 'development'

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <Document title={`Error | ${error.status}`}>
          <main className="error">
            <h1>{error.status}</h1>
            <p>{error.data || error.statusText}</p>

            <Link to="/">&larr; Take me back to safety</Link>
          </main>
        </Document>
      </Document>
    )
  } else if (error instanceof Error) {
    return (
      <Document title="Error">
        <main className="error">
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          {isDev && <pre>{error.stack}</pre>}

          <Link to="/">&larr; Take me back to safety</Link>
        </main>
      </Document>
    )
  } else {
    return (
      <Document title="Error">
        <main className="error">
          <h1>Unknown Error</h1>

          <Link to="/notes">&larr; Take me back to safety</Link>
        </main>
      </Document>
    )
  }
}
