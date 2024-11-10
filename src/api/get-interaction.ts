import { api } from '@/lib/axios'

export interface Interactions {
  id: string
  gameId: string
  comment: number
  favorite: number
  like: number
}

export async function getInteraction(gameId: string | undefined) {
  // const response = await api.get<Interactions>('/interactions', {
  //   params: { gameId },
  // })

  const response = await api.get<Interactions>(`/interactions/statistics/${gameId}`)

  return response.data
}
