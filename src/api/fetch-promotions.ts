import { api } from '@/lib/axios'

import type {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'

interface GetPromotionsQuery {
  category?: string[]
  search?: string
}

export async function fetchPromotions({
  category,
  search,
}: GetPromotionsQuery): Promise<PromotionCard[]> {
  const response = await api.get<Promotion[]>('/promotions', {
    params: {
      category,
      title: search,
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()
      Object.keys(params).forEach((key) => {
        const value = params[key]
        if (Array.isArray(value)) {
          value.forEach((val) => searchParams.append(key, val))
        } else if (value !== undefined) {
          searchParams.append(key, value)
        }
      })
      return searchParams.toString()
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
