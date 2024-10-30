import { api } from '@/lib/axios'

import type { Interactions } from './get-interaction'

interface GetPromotionsQuery {
  categories?: string[]
}

export interface Promotions {
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

export async function fetchPromotions({ categories }: GetPromotionsQuery) {
  const response = await api.get<Promotions[]>('/promotions', {
    params: {
      categories: categories ? categories.join(',') : undefined,
    },
  })

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
      const likesResponse = await api.get<Interactions>(
        `/interactions/${promotionId}`,
      )

      return {
        ...promotion,
        likes: likesResponse.data.like,
      }
    }),
  )

  return promotions
}
