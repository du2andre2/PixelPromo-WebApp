import { api } from '@/lib/axios'
import { Promotion } from './get-promotion'
import { Auth } from './login';

export interface createPromotionProps {
  promotion: Promotion
  image: File
  auth: Auth
}

export async function createPromotion({
  promotion,
  image,
  auth,
}: createPromotionProps) {
  const response = await api.post<Promotion>(
    '/promotions', 
    promotion,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  ) 

  const formData = new FormData()
  formData.append('image', image)

  await api.post(`/promotions/image/${response.data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
