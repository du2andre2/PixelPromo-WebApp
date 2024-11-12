import { api } from '@/lib/axios'

import type {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'

export async function getWishList(
  userId: string | undefined,
): Promise<PromotionCard[]> {
  const response = await api.get<Promotion[]>(`/promotions/favorites/${userId}`)

  const wishList = await Promise.all(
    response.data.map(async (promotion) => {
      const [
        userResponse,
        promotionInteractionsResponse,
        promotionUserInteractionsresponse,
      ] = await Promise.all([
        api.get<User>(`/users/${promotion.userId}`),
        api.get<PromotionInteractionsStatistics>(
          `/interactions/statistics/${promotion.id}`,
        ),
        api.get<PromotionUserInteractionsStatistics>(
          `/interactions/promotion-user-statistics?userID=${promotion.userId}&promotionID=${promotion.id}`,
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
