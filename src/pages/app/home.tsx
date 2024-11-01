import { useQuery } from '@tanstack/react-query'
import { Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

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

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const promotionName = searchParams.get('promotionName') || ''

  const { data: categoriesQuery } = useQuery({
    queryKey: ['categoriesQuery'],
    queryFn: fetchCategories,
  })

  const { data: recommededPromotions } = useQuery({
    queryKey: ['recommededPromotions'],
    queryFn: fetchRecommendedPromotions,
  })

  const promotionsQuery = useQuery({
    queryKey: ['promotionsQuery', selectedCategories, promotionName],
    queryFn: () =>
      fetchPromotions({
        categories:
          selectedCategories.length > 0 ? selectedCategories : undefined,
        promotionName,
      }),
    enabled: false,
  })

  useEffect(() => {
    promotionsQuery.refetch()
  }, [searchParams, selectedCategories, promotionsQuery])

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev: string[]) => {
      let updatedCategories

      if (prev.includes(category)) {
        updatedCategories = prev.filter((cat) => cat !== category)
      } else {
        updatedCategories = [...prev, category]
      }

      const params = new URLSearchParams(searchParams)
      params.set('categories', updatedCategories.join(','))
      setSearchParams(params)

      return updatedCategories
    })
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex w-app flex-col space-y-4 text-slate-200">
        <h1 className="mt-4 text-3xl font-bold">Jogos recomendados</h1>
        <div className="flex justify-between">
          {recommededPromotions &&
            recommededPromotions.map((promotion) => (
              <GameCard key={promotion.id} promotion={promotion} />
            ))}
        </div>
        <h1 className="mt-6 text-3xl font-bold">
          Ache seu próximo game favorito!
        </h1>
        <div className="flex h-10 w-full items-center justify-end gap-4 rounded-sm bg-green-600 px-4 text-slate-200">
          <p className="text-xl font-semibold">Filtros</p>
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
        </div>
        <div className="grid grid-cols-5 gap-x-3 gap-y-2 lg:grid-cols-6">
          {promotionsQuery.data && promotionsQuery.data.length > 0 ? (
            promotionsQuery.data.map((promotion) => (
              <GameCard key={promotion.id} promotion={promotion} />
            ))
          ) : (
            <h1>Promoção não encontrada</h1>
          )}
        </div>
      </div>
    </>
  )
}
