import { api } from '@/lib/axios'
import { Auth } from './login'

export interface Categories {
  name: string
  id: string
}

export interface getCategoriesProps {
  auth: Auth
}

export async function getCategories({ auth }: getCategoriesProps) {
  const response = await api.get<Categories[]>('/categories',{
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })

  return response.data
}
