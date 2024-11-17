import { api } from '@/lib/axios'
import { User } from './get-user'
import { Auth } from './login'

export interface updateUserProps {
  auth: Auth
  user: User
  image: File | null
}

export async function updateUser({
  auth,
  user,
  image,
}: updateUserProps) {
  await api.patch<User>('/users', user,{
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })

  if (!image) return

  const formData = new FormData()
  formData.append('image', image)

  await api.post(`/users/picture/${user.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth.token}`,
    },    
  })
}
