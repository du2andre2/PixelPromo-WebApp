import { api } from '@/lib/axios'

import { UserInteractionsStatistics } from './get-interaction'

export interface User {
  id: string
  name: string
  email: string
  password: string
  pictureUrl: string
  totalScore: number
  level: number
  elo: string
  createdAt: string
}

export interface UserCard {
  user: User
  interactions: UserInteractionsStatistics
}

export async function getUser(userId: string | undefined) {
  const userResponse = await api.get<User>(`/users/${userId}`)
  const response = await api.get<UserInteractionsStatistics>(
    `/interactions/user-statistics/${userId}`,
  )
  const userCard = {
    user: userResponse.data,
    interactions: response.data,
  }

  return userCard
}
