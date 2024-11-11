import { useQuery } from '@tanstack/react-query'

import { getWishList } from '@/api/get-wish-list'

import WishListItem from './WishListItem'

export default function WishList() {
  const userId = '1' // TODO: implement session
  const { data: wishListQuery } = useQuery({
    queryKey: ['wishListQuery', userId],
    queryFn: () => getWishList(userId),
  })

  return (
    <div className="space-y-2">
      {wishListQuery &&
        wishListQuery.map((promotionCard) => (
          <WishListItem
            key={promotionCard.promotion.id}
            promotionCard={promotionCard}
          />
        ))}
    </div>
  )
}
