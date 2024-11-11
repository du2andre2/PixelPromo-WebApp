import { api } from '@/lib/axios'

import { InteractionsStatistics } from './get-interaction'
import { User } from './get-user'
import { log } from 'console'

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
  interactions: InteractionsStatistics
}

export async function getPromotion(promotionId: string | undefined) {
  const promotionResponse = await api.get<Promotion>(
    `/promotions/${promotionId}`,
  )

  const userResponse = await api.get<User>(
    `/users/${promotionResponse.data.userId}`,
  )

  const response = await api.get<InteractionsStatistics>(
    `/interactions/statistics/${promotionResponse.data.id}`,
  )

  const promotionCard = {
    promotion: promotionResponse.data,
    user: userResponse.data,
    interactions: response.data,
  }

  return promotionCard
}
