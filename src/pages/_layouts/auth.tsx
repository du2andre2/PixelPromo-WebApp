import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <div>Auth</div>

      <div>
        <Outlet />
      </div>
    </>
  )
}
