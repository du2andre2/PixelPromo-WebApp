import { api } from '@/lib/axios'

export interface CreatePromotionBody {
  promotionImage: undefined | File
  gameName: string
  gamePrice: string
  gamePriceWithDiscount: string
  gameDiscount: string
  gamePlatform: string
  gameURL: string
}

export async function createPromotion({
  gameName,
  gameDiscount,
  gamePlatform,
  gamePrice,
  gamePriceWithDiscount,
  gameURL,
  promotionImage,
}: CreatePromotionBody) {
  await api.post('/promotions', {
    gameName,
    gameDiscount,
    gamePlatform,
    gamePrice,
    gamePriceWithDiscount,
    gameURL,
    promotionImage,
  })
}
