import { api } from '@/lib/axios'

export interface InteractionsStatistics {
  id: string
  gameId: string
  comment: number
  favorite: number
  like: number
}

export async function getInteraction(promotionId: string | undefined) {
  const response = await api.get<InteractionsStatistics>(
    `/interactions/statistics/${promotionId}`,
  )

  return response.data
}
