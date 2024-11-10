import { api } from '@/lib/axios'

import type { Interactions } from './get-interaction'
import type { Promotion } from './get-promotion'

interface GetPromotionsQuery {
  categories?: string[]
  promotionName?: string
}

export async function fetchPromotions({
  categories,
  promotionName,
}: GetPromotionsQuery) {
  // const response = await api.get<Promotions[]>('/promotions', {
  //   params: {
  //     categories: categories ? categories.join(',') : undefined,
  //     title: promotionName,
  //   },
  // })

  const response = await api.get<Promotion[]>(`/promotions?title=${promotionName || ''}`)

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

  const promotions = await Promise.all(
    response.data.map(async (promotion) => {
      const promotionId = promotion.id
      const likesResponse = await api.get<Interactions>(`/interactions/statistics/${promotionId}`)

      return {
        ...promotion,
        likes: likesResponse.data.like,
      }
    }),
  )

  return promotions
}
