import { useQuery } from '@tanstack/react-query'

import { getWishList } from '@/api/get-wish-list'

import WishListItem from './WishListItem'

export default function WishList() {
  const { data: wishListQuery } = useQuery({
    queryKey: ['wishListQuery'],
    queryFn: getWishList,
  })

  return (
    <div className="space-y-2">
      {wishListQuery &&
        wishListQuery.map((promotion) => (
          <WishListItem key={promotion.id} promotion={promotion} />
        ))}
    </div>
  )
}
