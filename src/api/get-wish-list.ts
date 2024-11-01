import { api } from '@/lib/axios'

import type { Interactions } from './get-interaction'
import type { Promotion } from './get-promotion'

export async function getWishList() {
  const response = await api.get<Promotion[]>('/wish-list')

  const wishList = await Promise.all(
    response.data.map(async (promotion) => {
      const promotionId = promotion.id
      const likesResponse = await api.get<Interactions>(
        `/interactions/${promotionId}`,
      )

      return {
        ...promotion,
        likes: likesResponse.data.like,
      }
    }),
  )

  return wishList
}
