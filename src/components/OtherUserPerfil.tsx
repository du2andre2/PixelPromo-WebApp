import bronzeBadge from '@/assets/bronze final.svg'
import userImg from '@/assets/user-img.jpg'

import PublishedOffersTable from './PublishedOffersTable'
import RankItem from './RankItem'

export default function OtherUserPerfil() {
  return (
    <div className="mt-4 flex w-app flex-col gap-4 text-slate-200">
      <div className="flex-col justify-between rounded-sm border border-gray-700 bg-gray-800 px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex flex-1 items-center justify-center gap-6">
              <div>
                <img
                  src={userImg}
                  alt="Imagem do usuário"
                  className="h-20 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-4xl">José Mourinho</p>
                <p>221 Comentários / 17 Ofertas publicadas</p>
              </div>
            </div>
          </div>
          <div className="mb-2 flex flex-col items-center justify-center">
            <img src={bronzeBadge} alt="Bronze badge" className="h-28" />
            <p>Nível 8</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-4 rounded-sm border border-gray-700 bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Minhas Ofertas</p>
          </div>
          <PublishedOffersTable />
        </div>
        <div className="flex basis-1/4 flex-col rounded-sm border border-gray-700 bg-gray-800 px-2 py-4">
          <p className="flex items-center justify-center text-2xl font-semibold">
            Ranking de usuários
          </p>
          <div className="mt-2 flex flex-col space-y-2">
            {Array.from({ length: 7 }, (_, index) => (
              <RankItem key={index} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
