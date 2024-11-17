import { api } from '@/lib/axios'

import { User } from './get-user'
import { Auth } from './login'

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

interface fetchPromotionCommentsProps{
  promotionId: string | undefined
  auth: Auth
}


export async function fetchPromotionComments({promotionId,auth}: fetchPromotionCommentsProps) {
  const commentResponse = await api.get<PromotionComment[]>(
    `/interactions/comments/${promotionId}`,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  ) 

  const promotionCommentCards: PromotionCommentCard[] = await Promise.all(
    commentResponse.data.map(async (comment) => {
      const userResponse = await api.get<User>(`/users/${comment.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
      return {
        comment,
        user: userResponse.data,
      }
    }),
  )

  return promotionCommentCards
}
