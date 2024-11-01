import { api } from '@/lib/axios'

import type { Interactions } from './get-interaction'
import type { Promotion } from './get-promotion'

export async function fetchRecommendedPromotions() {
  // const response = await api.get<Promotions[]>('/recommended-promotions')

  const response = await api.get<Promotion[]>('/recommended-promotions')

  //   const promotions = await Promise.all(
  //     response.data.map(async (promotion) => {
  //       const likesResponse = await api.get<Interactions>('/interactions', {
  //         params: {
  //           gameId: promotion.id,
  //         },
  //       })

  //       return {
  //         ...promotion,
  //         likesAmount: likesResponse.data.like,
  //       }
  //     }),
  //   )

  const recommendedPromotions = await Promise.all(
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

  return recommendedPromotions
}
