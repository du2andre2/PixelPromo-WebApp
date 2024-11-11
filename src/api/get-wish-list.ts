import { api } from '@/lib/axios'

import type { InteractionsStatistics } from './get-interaction'
import type { Promotion, PromotionCard } from './get-promotion'
import type { User } from './get-user'

export async function getWishList(
  userId: string | undefined,
): Promise<PromotionCard[]> {
  const response = await api.get<Promotion[]>(`/promotions/favorites/${userId}`)

  const wishList = await Promise.all(
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

  return wishList
}
