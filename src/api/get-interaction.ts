import { api } from '@/lib/axios'

export interface PromotionInteractionsStatistics {
  comment: number
  favorite: number
  create: number
  like: number
}

export interface UserInteractionsStatistics {
  comment: number
  favorite: number
  create: number
  like: number
}
export interface PromotionUserInteractionsStatistics {
  favorite: boolean
  like: boolean
}

export async function getPromotionInteraction(promotionId: string | undefined) {
  const response = await api.get<PromotionInteractionsStatistics>(
    `/interactions/statistics/${promotionId}`,
  )

  return response.data
}

export async function getUserInteraction(userId: string | undefined) {
  const response = await api.get<UserInteractionsStatistics>(
    `/interactions/user-statistics/${userId}`,
  )

  return response.data
}

export async function getPromotionUserInteraction(
  promotionId: string | undefined,
  userId: string | undefined,
) {
  const response = await api.get<PromotionUserInteractionsStatistics>(
    `/interactions/promotion-user-statistics?userID=${userId}&promotionID=${promotionId}`,
  )

  return response.data
}
