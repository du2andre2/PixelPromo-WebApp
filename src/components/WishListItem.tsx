import { ExternalLink, ThumbsUp, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { PromotionCard } from '@/api/get-promotion'
import userImg from '@/assets/user-img.jpg'

interface PromotionProps {
  promotionCard: PromotionCard
}

export default function WishListItem({ promotionCard }: PromotionProps) {
  const [liked, setLiked] = useState<boolean>(false)
  const [favorited, setFavorited] = useState<boolean>(false)
  const [likesAmount, setLikesAmount] = useState<number>(
    promotionCard.promotionInteractions?.like || 0,
  )

  function handleFavoritePromotion() {
    setFavorited(true)
  }

  function handleUnfavoritePromotion() {
    setFavorited(false)
  }

  function handleLikePromotion() {
    setLiked(true)
    setLikesAmount(likesAmount + 1)
  }

  function handleUnlikePromotion() {
    setLiked(false)
    setLikesAmount(likesAmount - 1)
  }

  useEffect(() => {
    setLiked(promotionCard.promotionUserInteractions?.like || false)
    setFavorited(promotionCard.promotionUserInteractions?.favorite || false)
    setLikesAmount(promotionCard.promotionInteractions.like)
  }, [promotionCard])

  return (
    <div className="flex h-32 w-full justify-between rounded-sm border border-gray-700 bg-gray-800">
      <Link
        className="flex w-40 items-center justify-center gap-2 border-b border-gray-700 px-4"
        to={`/promotion/${promotionCard.promotion.id}`}
      >
        <img
          src={promotionCard.promotion.imageUrl}
          alt="Imagem do jogo"
          className="h-24 object-cover"
        />
      </Link>

      <div className="mx-2 my-1 flex w-48 flex-col pb-1 pr-2 pt-4">
        <div className="flex basis-4/5">
          <div className="mb-1 flex flex-1 flex-col gap-0">
            <div className="flex basis-3/4">
              <div className="flex flex-1 flex-col">
                <p className="text-sm line-through">
                  R$ {promotionCard.promotion.originalPrice}
                </p>
                <p>R$ {promotionCard.promotion.discountedPrice}</p>
              </div>
              <div className="mr-8 mt-2 h-fit rounded-md bg-green-500 p-1 text-sm">
                -{promotionCard.promotion.discountBadge}%
              </div>
            </div>
            <div className="basis-1/4">{promotionCard.promotion.title}</div>
          </div>
          <div className="mb-2 flex basis-1/5 items-end justify-end">
            <img
              src={userImg}
              alt="Imagem do usuário"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex basis-1/5 items-center justify-between">
          <p className="flex items-center gap-1 text-sm">
            {promotionCard.promotion.platform}{' '}
            <Link to={promotionCard.promotion.link} target="_blank">
              <ExternalLink size={14} className="mb-0.5" />
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <button
              className={` ${
                favorited ? 'text-red-700' : 'border-slate-200'
              } transition-colors duration-200`}
              onClick={
                favorited ? handleUnfavoritePromotion : handleFavoritePromotion
              }
            >
              <Trash2 size={16} />
            </button>

            <button
              className={`flex items-center gap-1 rounded-sm border px-1 text-sm ${
                liked ? 'border-blue-700 text-blue-700' : 'border-slate-200'
              } transition-colors duration-200`}
              onClick={liked ? handleUnlikePromotion : handleLikePromotion}
            >
              {likesAmount}
              <ThumbsUp size={16} className="pb-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
