import { ExternalLink, ThumbsUp, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import type { PromotionCard } from '@/api/get-promotion';
import userDefault from '@/assets/user-default.png';
import gameDefault from '@/assets/game-default.png';
import { createInteraction } from '@/api/create-interaction';
import { Auth } from '@/api/login';

interface PromotionProps {
  promotionCard: PromotionCard;
  onDeleteFavoriteItem: () => void;
  auth: Auth;
}

export default function WishListItem({
  promotionCard,
  onDeleteFavoriteItem,
  auth,
}: PromotionProps) {
  const [interactions, setInteractions] = useState({
    liked: promotionCard.promotionUserInteractions?.like || false,
    likesAmount: promotionCard.promotionInteractions.like,
  });

  async function handleDeleteFavoritePromotion() {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard.promotion.id || '',
          userId: auth.userId || '',
          interactionType: 'favorite',
        },
        auth: auth,
      });
      onDeleteFavoriteItem();
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
      setInteractions({
        liked: true,
        likesAmount: interactions.likesAmount + 1,
      });
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
      setInteractions({
        liked: false,
        likesAmount: interactions.likesAmount - 1,
      });
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
  }

  return (
    <div className="flex h-32 w-full justify-between rounded-sm border border-gray-700 bg-gray-800">
      <Link
        className="flex w-40 items-center justify-center gap-2 border-b border-gray-700 px-4"
        to={`/promotion/${promotionCard.promotion.id}`}
      >
        <img
          src={promotionCard.promotion.imageUrl || gameDefault}
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
            <Link to={`/user/${promotionCard.user.id}`}>
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
              className="text-red-700 border-slate-200 transition-colors duration-200"
              onClick={handleDeleteFavoritePromotion}
            >
              <Trash2 size={16} />
            </button>

            <button
              className={`flex items-center gap-1 rounded-sm border px-1 text-sm ${
                interactions.liked
                  ? 'border-blue-700 text-blue-700'
                  : 'border-slate-200'
              } transition-colors duration-200`}
              onClick={
                interactions.liked ? handleUnlikePromotion : handleLikePromotion
              }
            >
              {interactions.likesAmount}
              <ThumbsUp size={16} className="pb-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
