import { api } from '@/lib/axios'

import type { InteractionsStatistics } from './get-interaction'
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
    }
  })

  const promotionCards = await Promise.all(
    response.data.map(async (promotion) => {
      const [userResponse, interactionsResponse] = await Promise.all([
        api.get<User>(`/users/${promotion.userId}`),
        api.get<InteractionsStatistics>(
          `/interactions/statistics/${promotion.id}`,
        ),
      ])

      return {
        promotion,
        user: userResponse.data,
        interactions: interactionsResponse.data,
      } as PromotionCard
    }),
  )

  return promotionCards
}
