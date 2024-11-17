import { useQuery } from '@tanstack/react-query'

import { getWishList } from '@/api/get-wish-list'

import WishListItem from './WishListItem'
import { Auth } from '@/api/login'

interface WishListProps { 
  auth: Auth
}

export default function WishList({ auth }: WishListProps) {
  const { data: wishListQuery,refetch :refetchWishList } = useQuery({
    queryKey: ['wishListQuery', auth.userId],
    queryFn: () => getWishList({userId:auth.userId,auth: auth}),
  })

  return (
    <div className="space-y-2">
      {wishListQuery &&
        wishListQuery.map((promotionCard) => (
          <WishListItem
            key={promotionCard.promotion.id}
            promotionCard={promotionCard}
            onDeleteFavoriteItem={ refetchWishList }
            auth={auth}
          />
        ))}
    </div>
  )
}
