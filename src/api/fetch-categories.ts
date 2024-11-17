import { api } from '@/lib/axios'
import { Auth } from './login'

export interface Categories {
  name: string
  id: string
}

interface fetchCategoriesProps{
  auth: Auth
}

export async function fetchCategories( {auth}: fetchCategoriesProps) {
  const response = await api.get<Categories[]>(
    '/categories',
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  ) 

  return response.data
}
