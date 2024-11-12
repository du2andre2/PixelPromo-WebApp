import { api } from '@/lib/axios'

import type { UserInteractionsStatistics } from './get-interaction'
import type { User } from './get-user'

export interface RankingCard {
  user: User
  interactions: UserInteractionsStatistics
  index: number
}

export async function getRankingList(): Promise<RankingCard[]> {
  const response = await api.get<User[]>(`/users/rank?limit=7`)

  const rankingList = await Promise.all(
    response.data.map(async (user) => {
      const [interactionsResponse] = await Promise.all([
        api.get<UserInteractionsStatistics>(
          `/interactions/user-statistics/${user.id}`,
        ),
      ])

      return {
        user,
        interactions: interactionsResponse.data,
        index: response.data.indexOf(user) + 1,
      } as RankingCard
    }),
  )

  return rankingList
}
