import { Outlet } from '@remix-run/react'

export default function ExpensesLayout() {
  return (
    <div>
      <h1>Base Layout</h1>
      <Outlet />
    </div>
  )
}
