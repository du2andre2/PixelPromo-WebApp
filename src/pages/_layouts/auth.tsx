import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-slate-900 font-roboto">
      <div className="mt-10 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
