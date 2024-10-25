import { ScrollText } from 'lucide-react'

import logoImg from '@/assets/logo.jpg'

export function Header() {
  return (
    <div className="flex h-14 w-full items-center justify-center bg-green-600 text-slate-200">
      <div className="flex w-app items-center justify-between">
        <div className="flex h-full items-center gap-6">
          <div className="flex items-center">
            <img src={logoImg} alt="Logo do Pixel Promo" />
          </div>
          <p className="text-xl font-semibold">Pixel Promo</p>
        </div>

        <div className="flex h-full items-center gap-6">
          <div className="flex items-center rounded-sm border border-slate-200 p-1">
            <ScrollText size={30} />
          </div>
          <div className="flex items-center rounded-sm border border-slate-200 p-2">
            Meu perfil
          </div>
        </div>
      </div>
    </div>
  )
}
