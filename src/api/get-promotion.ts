import { api } from '@/lib/axios'

import {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import { User } from './get-user'
import { Auth } from './login'

export interface Promotion {
  id?: string
  userId: string
  title: string
  originalPrice: number
  discountedPrice: number
  discountBadge?: number
  platform: string
  imageUrl?: string
  link: string
  categories: string[]
  createdAt?: string
}

export interface PromotionCard {
  promotion: Promotion
  user: User
  promotionInteractions: PromotionInteractionsStatistics
  promotionUserInteractions: PromotionUserInteractionsStatistics
}

export interface getPromotionProps {
  promotionId: string | undefined
  auth: Auth
}

export async function getPromotion({ promotionId, auth }: getPromotionProps) {
  const promotionResponse = await api.get<Promotion>( 
    `/promotions/${promotionId}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )

  const userResponse = await api.get<User>(
    `/users/${promotionResponse.data.userId}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )

  const promotionInteractionsresponse =
    await api.get<PromotionInteractionsStatistics>(
      `/interactions/statistics/${promotionResponse.data.id}`,{
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )

  const promotionUserInteractionsresponse =
    await api.get<PromotionUserInteractionsStatistics>(
      `/interactions/promotion-user-statistics?userId=${auth.userId}&promotionId=${promotionResponse.data.id}`,{
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )

  const promotionCard = {
    promotion: promotionResponse.data,
    user: userResponse.data,
    promotionInteractions: promotionInteractionsresponse.data,
    promotionUserInteractions: promotionUserInteractionsresponse.data,
  }

  return promotionCard
}
