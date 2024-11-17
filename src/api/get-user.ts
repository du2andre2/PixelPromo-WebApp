import { api } from '@/lib/axios'

import { UserInteractionsStatistics } from './get-interaction'
import { Auth } from './login'

export interface User {
  id?: string
  name: string
  email: string
  password: string
  pictureUrl?: string
  totalScore?: number
  level?: number
  elo?: string
  createdAt?: string
}

export interface UserCard {
  user: User
  interactions: UserInteractionsStatistics
}

export interface getUserProps {
  userId: string | undefined
  auth: Auth
}

export async function getUser({ userId, auth }: getUserProps): Promise<UserCard> {
  const userResponse = await api.get<User>(`/users/${userId}`,{
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  }) 
  const response = await api.get<UserInteractionsStatistics>(
    `/interactions/user-statistics/${userId}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )
  const userCard = {
    user: userResponse.data,
    interactions: response.data,
  }

  return userCard
}
