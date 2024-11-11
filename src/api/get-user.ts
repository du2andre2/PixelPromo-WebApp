import { api } from '@/lib/axios'

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

export async function getInteraction(userId: string | undefined) {
  const response = await api.get<User>(`/users/${userId}`)

  return response.data
}
