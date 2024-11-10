import { api } from '@/lib/axios'

export interface Categories {
  name: string
  id: string
}

export async function fetchCategories() {
  const response = await api.get<Categories[]>('/categories');

  return response.data
}
