import { api } from '@/lib/axios'

interface GetInteractionsQuery {
  gameId: string | null
}

export interface Interactions {
  id: string
  gameId: string
  comment: number
  favorite: number
  like: number
}

export async function getInteractions({ gameId }: GetInteractionsQuery) {
  const response = await api.get<Interactions>('/interactions', {
    params: { gameId },
  })

  return response.data
}
