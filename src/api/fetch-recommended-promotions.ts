import { api } from '@/lib/axios'

import type {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'

export async function fetchRecommendedPromotions(): Promise<PromotionCard[]> {
  const response = await api.get<Promotion[]>('/promotions', {
    params: {
      limit: 6,
    },
  })

  const userID = '1' // TODO: obter ID do usuário autenticado

  const promotionCards = await Promise.all(
    response.data.map(async (promotion) => {
      const [userResponse, interactionsResponse, userInteractionsResponse] =
        await Promise.all([
          api.get<User>(`/users/${promotion.userId}`),
          api.get<PromotionInteractionsStatistics>(
            `/interactions/statistics/${promotion.id}`,
          ),
          api.get<PromotionUserInteractionsStatistics>(
            `/interactions/promotion-user-statistics?userID=${userID}&promotionID=${promotion.id}`,
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
