import { api } from '@/lib/axios'

import type {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'
import { Auth } from './login'

export interface getWishListProps {
  userId: string | undefined
  auth: Auth
}

export async function getWishList(
  { userId, auth }: getWishListProps,
): Promise<PromotionCard[]> {
  const response = await api.get<Promotion[]>(`/promotions/favorites/${userId}`,{
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  }) 

  const wishList = await Promise.all(
    response.data.map(async (promotion) => {
      const [
        userResponse,
        promotionInteractionsResponse,
        promotionUserInteractionsresponse,
      ] = await Promise.all([
        api.get<User>(`/users/${promotion.userId}`,{
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }),
        api.get<PromotionInteractionsStatistics>(
          `/interactions/statistics/${promotion.id}`,{
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        ),
        api.get<PromotionUserInteractionsStatistics>(
          `/interactions/promotion-user-statistics?userId=${promotion.userId}&promotionId=${promotion.id}`,{
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        ),
      ])

      return {
        promotion,
        user: userResponse.data,
        promotionInteractions: promotionInteractionsResponse.data,
        promotionUserInteractions: promotionUserInteractionsresponse.data,
      } as PromotionCard
    }),
  )

  return wishList
}
