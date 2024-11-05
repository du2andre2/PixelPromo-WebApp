import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollText, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import logoImg from '@/assets/logo.jpg'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import WishList from './WishList'

const searchFormSchema = z.object({
  searchField: z.string().min(2),
})

type SearchFormData = z.infer<typeof searchFormSchema>

export function Header() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const isHomePage = location.pathname === '/'

  const { handleSubmit, register } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchField: '',
    },
  })

  function handleSearch({ searchField }: SearchFormData) {
    const params = new URLSearchParams(searchParams)

    params.set('promotionName', searchField)

    setSearchParams(params)
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
          {isHomePage && (
            <div className="flex h-10 w-96 items-center rounded-sm border border-slate-200 px-2 py-1">
              <form
                onSubmit={handleSubmit(handleSearch)}
                className="flex w-full items-center gap-2"
              >
                <button type="submit">
                  <Search size={20} />
                </button>
                <input
                  {...register('searchField')}
                  placeholder="O que você procura?"
                  className="flex w-full bg-transparent text-slate-200 placeholder-slate-200 outline-none focus:ring-0"
                />
              </form>
            </div>
          )}

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
                <WishList />
              </DialogContent>
            </Dialog>
            <Link
              to={`/user/1`}
              className="flex items-center rounded-sm border border-slate-200 p-2"
            >
              Meu perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
