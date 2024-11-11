import { api } from '@/lib/axios'

import { User } from './get-user'

export interface PromotionComment {
  id: string
  promotionId: string
  ownerUserId: string
  userId: string
  comment: string
  interactionType: string
  createdAt: string
}

export interface PromotionCommentCard {
  user: User
  comment: PromotionComment
}

export async function fetchPromotionComments(promotionId: string | undefined) {
  const commentResponse = await api.get<PromotionComment[]>(
    `/interactions/comments/${promotionId}`,
  )

  const promotionCommentCards: PromotionCommentCard[] = await Promise.all(
    commentResponse.data.map(async (comment) => {
      const userResponse = await api.get<User>(`/users/${comment.userId}`)
      return {
        comment,
        user: userResponse.data,
      }
    }),
  )

  return promotionCommentCards
}
