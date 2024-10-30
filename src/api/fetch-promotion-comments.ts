import { api } from '@/lib/axios'

export interface PromotionComment {
  id: string
  promotionId: string
  ownerUserId: string
  userId: string
  comment: string
  interactionType: string
  createdAt: string
}

export async function fetchPromotionComments(promotionId: string | undefined) {
  //   const response = await api.get<Promotions>('/promotions', {
  //     params: {
  //       promotionId,
  //     },
  //   })

  const response = await api.get<PromotionComment[]>(
    `/comments?promotionId=${promotionId}`,
  )

  const comment = await Promise.all(
    response.data.map(async (promotion) => {
      const promotionId = promotion.id
      const user = await api.get(`/user/${promotionId}`)

      return {
        ...promotion,
        commentOwner: user.data.name,
      }
    }),
  )

  console.log(comment)

  return comment
}
