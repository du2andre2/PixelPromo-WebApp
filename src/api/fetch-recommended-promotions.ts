import { api } from '@/lib/axios'

import type {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'
import { Auth } from './login'


export interface fetchRecommendedPromotionsProps {
  auth: Auth
}

export async function fetchRecommendedPromotions({auth}:fetchRecommendedPromotionsProps): Promise<PromotionCard[]> {
  const response = await api.get<Promotion[]>('/promotions', { 
    params: {
      limit: 6,
    },
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })

  const promotionCards = await Promise.all(
    response.data.map(async (promotion) => {
      const [userResponse, interactionsResponse, userInteractionsResponse] =
        await Promise.all([
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
            },
          ),
          api.get<PromotionUserInteractionsStatistics>(
            `/interactions/promotion-user-statistics?userId=${auth.userId}&promotionId=${promotion.id}`,{
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            },
          ),
        ])

      return {
        promotion,
        user: userResponse.data,
        promotionInteractions: interactionsResponse.data,
        promotionUserInteractions: userInteractionsResponse.data,
      } as PromotionCard
    }),
  )

  return promotionCards
}
