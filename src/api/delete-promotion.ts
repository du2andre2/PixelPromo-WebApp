import { api } from '@/lib/axios'
import { Auth } from './login'

interface deletePromotionProps{
  promotionId: string | undefined
  auth: Auth
}

export async function deletePromotion({promotionId,auth}:  deletePromotionProps) {
  await api.delete(
    `/promotions/${promotionId}`,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  ) 

  return 
}
