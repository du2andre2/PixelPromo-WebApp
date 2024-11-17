import { RankingCard } from '@/api/get-ranking'
import userDefault from '@/assets/user-default.png'
import { Link } from 'react-router-dom'

interface RankItemProps {
  rankingCard: RankingCard
}

export default function RankItem({ rankingCard }: RankItemProps) {
  return (
    <div
      className={`flex h-20 w-full gap-2 rounded-sm text-gray-800 ${
        rankingCard.index === 1 ? 'bg-yellow-300' : 'bg-gray-300'
      }`}
    >
      <div
        className={`flex items-center rounded-l-sm px-2 ${
          rankingCard.index === 1 ? 'bg-yellow-400' : 'bg-gray-400'
        }`}
      >
        {String(rankingCard.index).padStart(2, '0')}
      </div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-2">
        <Link to={`/user/${rankingCard.user.id}`} >
          <img
            src={
              rankingCard.user.pictureUrl
                ? `${rankingCard.user.pictureUrl}?timestamp=${new Date().getTime()}`
                : userDefault
            }
            alt="Imagem de perfil do usuário"
            className="h-12 w-12 object-cover rounded-full"
          />
          </Link>
          
          <div className="flex flex-col">
            <p className="text-lg">{rankingCard.user.name}</p>
            <p className="text-sm">
              {rankingCard.interactions.comment} Comentários
            </p>
            <p className="text-sm">
              {rankingCard.interactions.create} Publicações
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-lg">
          +{rankingCard.user.totalScore}
        </div>
      </div>
    </div>
  )
}
