import { api } from '@/lib/axios'
import { Auth } from './login'

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


export interface getPromotionInteractionProps {
  promotionId: string | undefined
  auth: Auth
}

export async function getPromotionInteraction({promotionId,auth}: getPromotionInteractionProps) {
  const response = await api.get<PromotionInteractionsStatistics>( 
    `/interactions/statistics/${promotionId}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )

  return response.data
}

export interface getUserInteractionProps {
  userId: string | undefined
  auth: Auth
}

export async function getUserInteraction({userId,auth}: getUserInteractionProps) {
  const response = await api.get<UserInteractionsStatistics>(
    `/interactions/user-statistics/${userId}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )

  return response.data
}

export interface getPromotionUserInteractionProps {
  promotionId: string | undefined
  userId: string | undefined
  auth: Auth
}

export async function getPromotionUserInteraction(
  {promotionId,userId,auth}: getPromotionUserInteractionProps,
) {
  const response = await api.get<PromotionUserInteractionsStatistics>(
    `/interactions/promotion-user-statistics?userId=${userId}&promotionId=${promotionId}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )

  return response.data
}
