import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink, Heart, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import { fetchPromotionComments } from '@/api/fetch-promotion-comments'
import { fetchRecommendedPromotions } from '@/api/fetch-recommended-promotions'
import { getPromotion } from '@/api/get-promotion'
import GameCard from '@/components/GameCard'

const commentFormSchema = z.object({
  comment: z.string().min(2),
})

type CommentFormData = z.infer<typeof commentFormSchema>

export default function Promotion() {
  const { id } = useParams()

  const { data: promotionCard } = useQuery({
    queryKey: ['promotionQuery', id],
    queryFn: () => getPromotion(id),
    enabled: !!id,
  })

  const { data: promotionComments } = useQuery({
    queryKey: ['promotionComments', id],
    queryFn: () => fetchPromotionComments(id),
    enabled: !!id,
  })

  const { handleSubmit, register } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
    },
  })

  const { data: recommededPromotions } = useQuery({
    queryKey: ['recommededPromotions'],
    queryFn: fetchRecommendedPromotions,
  })

  const [liked, setLiked] = useState<boolean>(false)
  const [favorited, setFavorited] = useState<boolean>(false)
  const [likesAmount, setLikesAmount] = useState<number>(0)

  useEffect(() => {
    if (promotionCard?.interactions?.like) {
      setLikesAmount(promotionCard.interactions.like)
    }
  }, [promotionCard])

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

  function handleCommentOnPromotion(data: CommentFormData) {
    console.log(data)
  }

  return (
    <>
      <Helmet title="Promotion" />
      <div className="mt-2 flex w-app gap-8 text-slate-200">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex rounded-sm border border-gray-700 bg-gray-800 px-6">
            <div className="flex basis-1/4 items-center justify-center border-r border-gray-900 p-4">
              <img
                src={promotionCard?.promotion?.imageUrl || ''}
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
                    <img
                      src={promotionCard?.user?.pictureUrl}
                      alt="Imagem do usuário"
                      className="rounded-full"
                    />
                  </div>
                  <p>{promotionCard?.user?.name}</p>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    className={` ${favorited ? 'text-red-500' : 'border-slate-200'} transition-colors duration-200`}
                    onClick={
                      favorited
                        ? handleUnfavoritePromotion
                        : handleFavoritePromotion
                    }
                  >
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
              {promotionCard?.interactions?.comment} comentários
            </p>
            <div className="mb-2 flex w-full flex-col">
              <div className="mt-2 flex w-full items-center gap-2">
                <div>
                  <img
                    src={promotionCard?.user?.pictureUrl}
                    alt="Imagem do usuário"
                    className="w-12 rounded-full"
                  />
                </div>
                <div className="flex h-full w-full flex-col">
                  <form
                    onSubmit={handleSubmit(handleCommentOnPromotion)}
                    className="flex w-full flex-col gap-2 px-2"
                  >
                    <input
                      type="text"
                      {...register}
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
                      <img
                        src={commentCard.user.pictureUrl}
                        alt="Imagem do usuário"
                        className="w-12 rounded-full"
                      />
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
              />
            ))}
        </div>
      </div>
    </>
  )
}
