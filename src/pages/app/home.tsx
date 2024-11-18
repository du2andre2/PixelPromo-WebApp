/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { Filter, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { fetchCategories } from '@/api/fetch-categories'
import { fetchPromotions } from '@/api/fetch-promotions'
import { fetchRecommendedPromotions } from '@/api/fetch-recommended-promotions'
import GameCard from '@/components/GameCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Auth } from '@/api/login'
import { getUser } from '@/api/get-user'


const searchFormSchema = z.object({
  searchField: z.string().min(1),
})

type SearchFormData = z.infer<typeof searchFormSchema>

export default function Home() {

  const authString = Cookies.get('auth'); 
  const auth: Auth | undefined = authString ? JSON.parse(authString) : undefined;

  if (!auth || !auth.token || !auth.userId) {
    window.location.href = '/sign-in';
    return null;  
  }

  const { data: authUserCard} = useQuery({
    queryKey: ['userQuery', auth.userId],
    queryFn: () => getUser({ userId: auth.userId ,auth: auth}),
    enabled: !!auth.userId,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [promotionName, setPromotionName] = useState('')

  const { data: categoriesQuery } = useQuery({
    queryKey: ['categoriesQuery'],
    queryFn: () => fetchCategories({ auth: auth }),
  })

  const { data: recommededPromotions } = useQuery({
    queryKey: ['recommededPromotions'],
    queryFn: () => fetchRecommendedPromotions({ auth: auth }),
  })

  const promotionsQuery = useQuery({
    queryKey: ['promotionsQuery', selectedCategories, promotionName],
    queryFn: () =>
      fetchPromotions({
        auth: auth,
        category:
          selectedCategories.length > 0 ? selectedCategories : undefined,
        search: promotionName,
      }),
  })

  const { handleSubmit, register, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchField: '',
    },
  })

  function handleSearch({ searchField }: SearchFormData) {
    setPromotionName(searchField)
  }

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev: string[]) => {
      let updatedCategories

      if (prev.includes(category)) {
        updatedCategories = prev.filter((cat) => cat !== category)
      } else {
        updatedCategories = [...prev, category]
      }

      return updatedCategories
    })
  }

  function clearSearch() {
    setPromotionName('')
    setSelectedCategories([])
    reset()
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex w-app flex-col space-y-4 text-slate-200">
        <h1 className="mt-4 text-3xl font-bold">Jogos recomendados para {authUserCard?.user.name}</h1>
        <div className="flex justify-between">
          {recommededPromotions &&
            recommededPromotions.map((promotion) => (
              <GameCard
                key={promotion.promotion.id}
                promotionCard={promotion}
                auth={auth}
              />
            ))}
        </div>
        <h1 className="mt-6 text-3xl font-bold">
          Ache seu próximo game favorito!
        </h1>
        <div className="flex h-10 w-full items-center justify-between rounded-sm bg-green-600 px-4 text-slate-200">
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="flex justify-between w-full items-center gap-2"
          >
            <button type="submit">
              <Search size={20} />
            </button>
            <input
              {...register('searchField')}
              placeholder="O que você procura?"
              className="flex w-full bg-transparent text-slate-200 placeholder-slate-200 outline-none focus:ring-0"
            />
            <button className="flex w-40 items-center justify-center rounded-sm border border-slate-200 py-0.5 px-1 mr-4"
                onClick={() => clearSearch()}
              >
                Limpar Pesquisa
              </button>
          </form>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center rounded-sm border border-slate-200 p-1">
                  <Filter size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4">
                <DropdownMenuLabel className="pb-2 text-lg font-semibold">
                  Categorias
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categoriesQuery &&
                  categoriesQuery.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      <input
                        type="checkbox"
                        value={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCheckboxChange(category.name)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <label className="text-sm text-gray-800">
                        {category.name}
                      </label>
                    </div>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-xl font-semibold">Filtros</p>
          </div>
          
        </div>
        <div className="grid grid-cols-5 gap-x-3 gap-y-2 lg:grid-cols-6">
          {promotionsQuery.data && promotionsQuery.data.length > 0 ? (
            promotionsQuery.data.map((promotion) => (
              <GameCard
                key={promotion.promotion.id}
                promotionCard={promotion}
                auth={auth}
              />
            ))
          ) : (
            <h1>Promoção não encontrada</h1>
          )}
        </div>
      </div>
    </>
  )
}
