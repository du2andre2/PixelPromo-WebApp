import { api } from '@/lib/axios'

import type {
  PromotionInteractionsStatistics,
  PromotionUserInteractionsStatistics,
} from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'
import { Auth } from './login'

interface fetchPromotionsProps {
  category?: string[]
  search?: string
  userId?: string
  auth: Auth
}

export async function fetchPromotions({
  category,
  search,
  userId,
  auth,
}: fetchPromotionsProps): Promise<PromotionCard[]> { 
  const response = await api.get<Promotion[]>('/promotions',
   {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    params: {
      category,
      title: search,
      userId,
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

  const promotionCards = await Promise.all(
    response.data.map(async (promotion) => {
      const [userResponse, interactionsResponse, userInteractionsResponse] =
        await Promise.all([
          api.get<User>(`/users/${promotion.userId}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }),
          api.get<PromotionInteractionsStatistics>(
            `/interactions/statistics/${promotion.id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          ),
          api.get<PromotionUserInteractionsStatistics>(
            `/interactions/promotion-user-statistics?userId=${auth.userId}&promotionId=${promotion.id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
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
