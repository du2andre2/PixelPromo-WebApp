import { ScrollText, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie' 

import logoImg from '@/assets/logo.jpg'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import WishList from './WishList'
import { Auth } from '@/api/login'

export function Header() {
  
  const authString = Cookies.get('auth'); 
  const auth: Auth | undefined = authString ? JSON.parse(authString) : undefined;

  if (!auth || !auth.token || !auth.userId) {
    window.location.href = '/sign-in';
    return null;  
  }
  const navigate = useNavigate() 

  function handleLogout() {
    Cookies.remove('auth')
    navigate('/')
  }
  
  return (
    <div className="flex h-14 w-full items-center justify-center bg-green-600 text-slate-200">
      <div className="flex w-app items-center justify-between">
        <Link className="flex h-full items-center gap-6" to="/">
          <div className="flex items-center">
            <img src={logoImg} alt="Logo do Pixel Promo" />
          </div>
          <p className="text-xl font-semibold">Pixel Promo</p>
        </Link>

        <div className="flex h-full items-center gap-12">

          <div className="flex h-full items-center gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center rounded-sm border border-slate-200 p-1">
                  <ScrollText size={30} />
                </button>
              </DialogTrigger>
              <DialogContent className="min-w-[400px] border border-gray-700 bg-gray-800 text-slate-200">
                <DialogHeader className="flex items-center text-lg">
                  Lista de desejos
                </DialogHeader>
                <WishList auth={auth} />
              </DialogContent>
            </Dialog>

            {auth && (
              <Link
                to={`/user/${auth.userId}`}
                className="flex items-center rounded-sm border border-slate-200 p-2"
              >
                Meu perfil
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center rounded-sm border border-slate-200 p-2"
            >
              <LogOut size={20} />
              <span className="ml-2">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
