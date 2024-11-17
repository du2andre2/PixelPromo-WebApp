import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-slate-900 font-roboto">
      <Header />

      <div className="flex w-full flex-1 justify-center">
        <Outlet />
      </div>
    </div>
  )
}
