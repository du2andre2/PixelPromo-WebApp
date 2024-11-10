import { api } from '@/lib/axios'

export interface User {
  id: string
  name: string
}

export async function getInteraction(userId: string | undefined) {
  // const response = await api.get<Interactions>('/interactions', {
  //   params: { gameId },
  // })

  const response = await api.get<User>(`/users/${userId}`)

  return response.data
}
