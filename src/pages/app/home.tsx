import { useQuery } from '@tanstack/react-query'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getCategories } from '@/api/get-categories'
import { getPromotions } from '@/api/get-promotions'
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

  const { data: categoriesQuery } = useQuery({
    queryKey: ['categoriesQuery'],
    queryFn: getCategories,
  })

  const promotionsQuery = useQuery({
    queryKey: ['promotionsQuery', selectedCategories],
    queryFn: () =>
      getPromotions({
        userId: '1',
        categories:
          selectedCategories.length > 0 ? selectedCategories : undefined,
      }),
  })

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev: string[]) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex w-app flex-col space-y-4 text-slate-200">
        <h1 className="mt-4 text-3xl font-bold">Jogos recomendados</h1>
        <div className="flex justify-between">
          {promotionsQuery.data &&
            promotionsQuery.data
              .slice(0, 6)
              .map((promotion) => (
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
          {promotionsQuery.data &&
            promotionsQuery.data.map((promotion) => (
              <GameCard key={promotion.id} promotion={promotion} />
            ))}
        </div>
      </div>
    </>
  )
}
