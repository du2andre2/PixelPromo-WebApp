/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink, Heart, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'
import userDefault from '@/assets/user-default.png'
import gameDefault from '@/assets/game-default.png'

import { fetchPromotionComments } from '@/api/fetch-promotion-comments'
import { fetchRecommendedPromotions } from '@/api/fetch-recommended-promotions'
import { getPromotion } from '@/api/get-promotion'
import GameCard from '@/components/GameCard'
import { createInteraction } from '@/api/create-interaction'
import Cookies from 'js-cookie'
import { Auth } from '@/api/login'
import { getUser } from '@/api/get-user'

const commentFormSchema = z.object({
  comment: z.string().min(2),
})

type CommentFormData = z.infer<typeof commentFormSchema>

export default function Promotion() {
  
  const authString = Cookies.get('auth'); 
  const auth: Auth | undefined = authString ? JSON.parse(authString) : undefined;

  if (!auth || !auth.token || !auth.userId) {
    window.location.href = '/sign-in';
    return null;  
  }

  const { data: authUserCard} = useQuery({
    queryKey: ['userQuery', auth.userId],
    queryFn: () => getUser({ userId: auth.userId ,auth: auth}),
    enabled: !!auth.userId,
  });
  
  const { id } = useParams()

  const { data: promotionCard } = useQuery({
    queryKey: ['promotionQuery', id],
    queryFn: () => getPromotion({ promotionId: id, auth: auth }),
    enabled: !!id,
  })

  const { data: promotionComments, refetch: refetchComments } = useQuery({
    queryKey: ['promotionComments', id],
    queryFn: () => fetchPromotionComments({ promotionId: id, auth: auth }),
    enabled: !!id,
  })

  const { handleSubmit, register, reset } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
    },
  });

  const { data: recommededPromotions } = useQuery({
    queryKey: ['recommededPromotions'],
    queryFn: () => fetchRecommendedPromotions({  auth: auth }),
  })

  const [liked, setLiked] = useState<boolean>(false)
  const [favorited, setFavorited] = useState<boolean>(false)
  const [likesAmount, setLikesAmount] = useState<number>(0)
  const [favoritedAmount, setFavoritedAmount] = useState<number>(0)

  useEffect(() => {
    if (promotionCard?.promotionInteractions?.like) {
      setLikesAmount(promotionCard.promotionInteractions.like)
    }
    if (promotionCard?.promotionInteractions?.favorite) {
      setFavoritedAmount(promotionCard.promotionInteractions.favorite)
    }
    setLiked(promotionCard?.promotionUserInteractions?.like || false)
    setFavorited(promotionCard?.promotionUserInteractions?.favorite || false)
  }, [promotionCard])

  async function handleCommentOnPromotion(data: CommentFormData) {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard?.promotion.id || '',
          userId: authUserCard?.user.id || '',
          interactionType: 'comment',
          comment: data.comment,
        },
        auth: auth!,
      });
      refetchComments()
      reset();
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
    
  }

  async function handleFavoritePromotion() {
    try {
      await createInteraction({
        interaction: {
          promotionId: promotionCard?.promotion.id || '',
          userId: authUserCard?.user.id || '',
          interactionType: 'favorite',
        },
        auth: auth!,
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
          promotionId: promotionCard?.promotion.id || '',
          userId: authUserCard?.user.id || '',
          interactionType: 'favorite',
        },
        auth: auth!,
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
          promotionId: promotionCard?.promotion.id || '',
          userId: authUserCard?.user.id || '',
          interactionType: 'like',
        },
        auth: auth!,
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
          promotionId: promotionCard?.promotion.id || '',
          userId: authUserCard?.user.id || '',
          interactionType: 'like',
        },
        auth: auth!,
      });
      setLiked(false)
      setLikesAmount(likesAmount - 1)
    } catch (error) {
      console.error('Erro ao criar interação:', error);
    }
  }




  return (
    <>
      <Helmet title="Promotion" />
      <div className="mt-2 flex w-app gap-8 text-slate-200">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex rounded-sm border border-gray-700 bg-gray-800 px-6">
            <div className="flex basis-1/4 items-center justify-center border-r border-gray-900 p-4">
              <img
                src={promotionCard?.promotion?.imageUrl || gameDefault}
                alt="imagem do jogo"
                className="h-40 rounded-md object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 px-8 py-4">
              <div className="flex">
                <div className="flex flex-1 flex-col gap-4">
                  <p className="text-4xl">{promotionCard?.promotion?.title}</p>
                  <div>
                    <Link
                      to={
                        promotionCard?.promotion?.link
                          ? promotionCard?.promotion.link
                          : '#'
                      }
                      target="_blank"
                    >
                      <button className="flex items-center gap-2 border border-slate-200 px-2 py-1 text-lg">
                        Acessar oferta <ExternalLink size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="basis-1/4">
                  <div className="flex basis-3/4">
                    <div className="flex flex-1 flex-col">
                      <p className="text-lg line-through">
                        R$ {promotionCard?.promotion?.originalPrice}
                      </p>
                      <p className="text-xl">
                        R$ {promotionCard?.promotion?.discountedPrice}
                      </p>
                    </div>
                    <div className="mt-3 h-fit rounded-md bg-green-500 p-1">
                      -{promotionCard?.promotion?.discountBadge}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10">
                    <Link to={`/user/${promotionCard?.user?.id}`} >
                      <img
                        src={promotionCard?.user?.pictureUrl || userDefault}
                        alt="Imagem do usuário"
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    </Link>
                  </div>
                  <p>{promotionCard?.user?.name}</p>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    className={`flex items-center gap-1 rounded-sm border px-1 text-lg ${
                      favorited
                        ? 'border-red-500 text-red-500'
                        : 'border-slate-200'
                    } transition-colors duration-200`}
                    onClick={
                      favorited
                        ? handleUnfavoritePromotion
                        : handleFavoritePromotion
                    }
                  >
                    {favoritedAmount}
                    <Heart size={20} fill={`${favorited ? 'red' : ''}`} />
                  </button>

                  <button
                    className={`flex items-center gap-1 rounded-sm border px-1 text-lg ${
                      liked
                        ? 'border-blue-700 text-blue-700'
                        : 'border-slate-200'
                    } transition-colors duration-200`}
                    onClick={
                      liked ? handleUnlikePromotion : handleLikePromotion
                    }
                  >
                    {likesAmount}
                    <ThumbsUp size={20} className="pb-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-sm border border-gray-700 bg-gray-800 px-6 py-2">
            <p className="text-xl-">
              {promotionCard?.promotionInteractions?.comment} comentários
            </p>
            <div className="mb-2 flex w-full flex-col">
              <div className="mt-2 flex w-full items-center gap-2">
                <div>
                  <img
                    src={authUserCard?.user.pictureUrl || userDefault} 
                    alt="Imagem do usuário"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </div>
                <div className="flex h-full w-full flex-col">
                  <form
                    onSubmit={handleSubmit(handleCommentOnPromotion)}
                    className="flex w-full flex-col gap-2 px-2"
                  >
                    <input
                      type="text"
                      {...register('comment')}
                      placeholder="Adicione um comentário..."
                      className="w-full border-b border-slate-100 bg-transparent text-sm"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-sm bg-green-500 px-2 py-0.5 text-sm hover:bg-green-600"
                        type="submit"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {promotionComments &&
                promotionComments.map((commentCard) => (
                  <div
                    className="mb-4 mt-2 flex w-full items-center gap-2"
                    key={commentCard.comment.id}
                  >
                    <div>
                    <Link to={`/user/${promotionCard?.user?.id}`} >
                      <img
                        src={commentCard.user.pictureUrl || userDefault}
                        alt="Imagem do usuário"
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    </Link>
                    </div>
                    <div className="flex h-full w-full flex-col">
                      <div className="flex w-full flex-col px-2">
                        <p className="w-full">{commentCard.user.name}</p>
                        <p className="text-sm">{commentCard.comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {recommededPromotions &&
            recommededPromotions.map((promotion) => (
              <GameCard
                key={promotion.promotion.id}
                promotionCard={promotion}
                auth={auth}
              />
            ))}
        </div>
      </div>
    </>
  )
}
