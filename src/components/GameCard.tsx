import { ExternalLink, Heart, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userDefault from '@/assets/user-default.png'
import gameDefault from '@/assets/game-default.png'

import type { PromotionCard } from '@/api/get-promotion'
import { createInteraction } from '@/api/create-interaction'
import { Auth } from '@/api/login'

interface PromotionProps {
  promotionCard: PromotionCard
  auth: Auth
}

export default function GameCard({ promotionCard,auth }: PromotionProps) {
  const [liked, setLiked] = useState<boolean>(
    promotionCard.promotionUserInteractions?.like || false,
  )
  const [favorited, setFavorited] = useState<boolean>(
    promotionCard.promotionUserInteractions?.favorite || false,
  )
  const [likesAmount, setLikesAmount] = useState<number>(
    promotionCard.promotionInteractions.like,
  )
  const [favoritedAmount, setFavoritedAmount] = useState<number>(
    promotionCard.promotionInteractions.favorite,
  )

  useEffect(() => {
    setLiked(promotionCard.promotionUserInteractions?.like || false)
    setFavorited(promotionCard.promotionUserInteractions?.favorite || false)
    setLikesAmount(promotionCard.promotionInteractions.like)
    setFavoritedAmount(promotionCard.promotionInteractions.favorite)
  }, [promotionCard])

  async function handleFavoritePromotion() {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard.promotion.id || '',
          userId: auth.userId || '',
          interactionType: 'favorite',
        },
        auth: auth,
      });
      setFavorited(true)
      setFavoritedAmount(favoritedAmount + 1)
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
    
  }

  async function handleUnfavoritePromotion() {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard.promotion.id || '',
          userId: auth.userId || '',
          interactionType: 'favorite',
        },
        auth: auth,
      });
      setFavorited(false)
      setFavoritedAmount(favoritedAmount - 1)
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
   
  }

  async function handleLikePromotion() {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard.promotion.id || '',
          userId: auth.userId || '',
          interactionType: 'like',
        },
        auth: auth,
      });
      setLiked(true)
      setLikesAmount(likesAmount + 1)
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
   
  }

  async function handleUnlikePromotion() {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard.promotion.id || '',
          userId: auth.userId || '',
          interactionType: 'like',
        },
        auth: auth,
      });
      setLiked(false)
      setLikesAmount(likesAmount - 1)
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
    
  }

  return (
    <div className="flex h-52 w-52 flex-col rounded-sm border border-gray-700 bg-gray-800">
      <Link
        className="flex flex-1 items-center justify-center gap-2 border-b border-gray-700"
        to={`/promotion/${promotionCard.promotion.id}`}
      >
        <img
          src={promotionCard.promotion.imageUrl || gameDefault}
          alt="Imagem do jogo"
          className="w-42 h-20 object-cover"
        />
      </Link>

      <div className="mx-2 my-1 flex flex-1 flex-col">
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
          <Link to={`/user/${promotionCard.user.id}`} >
            <img
              src={promotionCard.user.pictureUrl || userDefault}
              alt="Imagem do usuário"
              className="h-8 w-8 object-cover rounded-full"
            />
          </Link>
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
              className={`flex items-center gap-1 rounded-sm border px-1 text-sm ${
                favorited ? 'border-red-500 text-red-500' : 'border-slate-200'
              } transition-colors duration-200`}
              onClick={
                favorited ? handleUnfavoritePromotion : handleFavoritePromotion
              }
            >
              {favoritedAmount}
              <Heart size={16} fill={`${favorited ? 'red' : ''}`} />
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
