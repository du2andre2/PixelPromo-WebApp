import { api } from '@/lib/axios'

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

export async function getPromotion(promotionId: string | undefined) {
  const response = await api.get<Promotion>(`/promotions/${promotionId}`)
  const userId = response.data.userId

  const userResponse = await api.get<User>(`/users/${userId}`)
  const user = userResponse.data

  const interaction = { ...response.data, userName: user.name }

  return interaction
}
