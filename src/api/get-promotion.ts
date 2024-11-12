import { api } from '@/lib/axios'

import {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import { User } from './get-user'

export interface Promotion {
  id: string
  userId: string
  title: string
  description: string
  originalPrice: string
  discountedPrice: string
  discountBadge: string
  platform: string
  imageUrl: string
  link: string
  categories: string[]
  createdAt: string
  likes: number
}

export interface PromotionCard {
  promotion: Promotion
  user: User
  promotionInteractions: PromotionInteractionsStatistics
  promotionUserInteractions: PromotionUserInteractionsStatistics
}

export async function getPromotion(promotionId: string | undefined) {
  const promotionResponse = await api.get<Promotion>(
    `/promotions/${promotionId}`,
  )

  const userResponse = await api.get<User>(
    `/users/${promotionResponse.data.userId}`,
  )

  const promotionInteractionsresponse =
    await api.get<PromotionInteractionsStatistics>(
      `/interactions/statistics/${promotionResponse.data.id}`,
    )

  const userID = '1' // TODO: get user id from auth
  const promotionUserInteractionsresponse =
    await api.get<PromotionUserInteractionsStatistics>(
      `/interactions/promotion-user-statistics?userID=${userID}&promotionID=${promotionResponse.data.id}`,
    )

  const promotionCard = {
    promotion: promotionResponse.data,
    user: userResponse.data,
    promotionInteractions: promotionInteractionsresponse.data,
    promotionUserInteractions: promotionUserInteractionsresponse.data,
  }

  return promotionCard
}
