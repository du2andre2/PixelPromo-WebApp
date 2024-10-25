import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getCategories } from '@/api/get-categories'
import GameCard from '@/components/GameCard'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const categoriesFormSchema = z.object({
  categories: z.array(z.string()).nonempty('Selecione uma categoria'),
})

type CategoriesFormData = z.infer<typeof categoriesFormSchema>

export default function Home() {
  const { data: categoriesQuery } = useQuery({
    queryKey: ['categoriesQuery'],
    queryFn: getCategories,
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { handleSubmit, register } = useForm<CategoriesFormData>({
    resolver: zodResolver(categoriesFormSchema),
    defaultValues: {
      categories: [],
    },
  })

  useEffect(() => {
    if (selectedCategories.length > 0) {
      console.log('Categorias selecionadas:', selectedCategories)
    }
  }, [selectedCategories])

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev: string[]) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  function handleSelectCategories() {
    console.log('Categorias selecionadas:', selectedCategories)
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex w-app flex-col space-y-4 text-slate-200">
        <h1 className="mt-4 text-3xl font-bold">Jogos recomendados</h1>
        <div className="flex justify-between">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
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
            <DropdownMenuContent>
              <DropdownMenuLabel>Categorias</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form onSubmit={handleSubmit(handleSelectCategories)}>
                {categoriesQuery &&
                  categoriesQuery.map((category) => (
                    <div key={category.name}>
                      <DropdownMenuItem>
                        <label className="w-16">
                          <Checkbox
                            {...register('categories')}
                            value={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() =>
                              handleCheckboxChange(category.name)
                            }
                          />
                          {category.name}
                        </label>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                <button
                  type="submit"
                  className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Aplicar
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-5 gap-y-2 lg:grid-cols-6">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
      </div>
    </>
  )
}
