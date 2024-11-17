import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getRankingList } from '@/api/get-ranking'
import { getUser } from '@/api/get-user'
import bronzeBadge from '@/assets/bronze final.png'
import diamondBadge from '@/assets/diamante final.png'
import goldBadge from '@/assets/ouro final.png'
import platinumBadge from '@/assets/platina final.png'
import silverBadge from '@/assets/prata final.png'
import userDefault from '@/assets/user-default.png'

import PublishedOffersTable from './PublishedOffersTable'
import RankItem from './RankItem'
import { Auth } from '@/api/login'
import { fetchPromotions } from '@/api/fetch-promotions'
import { PromotionCard } from '@/api/get-promotion'

interface OtherUserPerfilProps {
  auth: Auth
}

export default function OtherUserPerfil({ auth }: OtherUserPerfilProps) {
  const { id } = useParams()

  const { data: promotionsList } = useQuery({
    queryKey: ['promotionsQuery', id],
    queryFn: () => fetchPromotions({ userId: id ,auth: auth}),
  });

  const { data: rankingList } = useQuery({
    queryKey: ['rankingQuery', id],
    queryFn: () => getRankingList({ auth: auth}),
  });
  
  const { data: userCard} = useQuery({
    queryKey: ['userQuery', id],
    queryFn: () => getUser({ userId: id ,auth: auth}),
    enabled: !!id,
  });

  function getBadgeImage(elo: string | undefined) {
    switch (elo) {
      case 'bronze':
        return bronzeBadge
      case 'silver':
        return silverBadge
      case 'gold':
        return goldBadge
      case 'platinum':
        return platinumBadge
      case 'diamond':
        return diamondBadge
      default:
        return bronzeBadge
    }
  }

  return (
    <div className="mt-4 flex w-app flex-col gap-4 text-slate-200">
      <div className="flex-col justify-between rounded-sm border border-gray-700 bg-gray-800 px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex flex-1 items-center justify-center gap-6">
              <div>
                <img
                  src={userCard?.user.pictureUrl || userDefault}
                  alt="Imagem do usuário"
                  className="h-20 w-20 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-4xl">{userCard?.user.name}</p>
                <p>
                  {userCard?.interactions.comment} Comentários recebidos /{' '}
                  {userCard?.interactions.create} Ofertas publicadas
                </p>
                <p>
                  {userCard?.interactions.like} Curtidas recebidos /{' '}
                  {userCard?.interactions.favorite} Favoritadas recebidos
                </p>
              </div>
            </div>
          </div>
          <div className="mb-2 flex flex-col items-center justify-center">
            <img
              src={getBadgeImage(userCard?.user.elo)}
              alt={`${userCard?.user.level} badge`}
              className="h-28"
            />
            <p>Nível {userCard?.user.level}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-4 rounded-sm border border-gray-700 bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Minhas Ofertas</p>
          </div>
          <PublishedOffersTable 
            auth={auth}
            promotions={promotionsList as PromotionCard[]} 
            onDelete={() => {}}
          />
        </div>
        <div className="flex basis-1/4 flex-col rounded-sm border border-gray-700 bg-gray-800 px-2 py-4">
          <p className="flex items-center justify-center text-2xl font-semibold">
            Ranking de usuários
          </p>
          <div className="mt-2 flex flex-col space-y-2">
            {rankingList &&
              rankingList.map((rankingCard) => (
                <RankItem key={rankingCard.index} rankingCard={rankingCard} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
