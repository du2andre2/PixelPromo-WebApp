import { api } from '@/lib/axios'

import type { Interactions } from './get-interaction'
import type { Promotion } from './get-promotion'

export interface PromotionComment {
  id: string
  promotionId: string
  ownerUserId: string
  userId: string
  comment: string
  interactionType: string
  createdAt: string
}

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

  const response = await api.get<Promotion[]>(
    `/promotions?title=${promotionName || ''}`,
  )

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

export async function fetchPromotionComments(promotionId: string | undefined) {
  //   const response = await api.get<Promotions>('/promotions', {
  //     params: {
  //       promotionId,
  //     },
  //   })

  const response = await api.get<PromotionComment[]>(
    `/interactions/comments/${promotionId}`,
  )

  const comment = await Promise.all(
    response.data.map(async (promotion) => {
      const promotionId = promotion.id
      const user = await api.get(`/users/${promotionId}`)

      return {
        ...promotion,
        commentOwner: user.data.name,
      }
    }),
  )

  console.log(comment)

  return comment
}
