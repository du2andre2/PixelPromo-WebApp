import userImg from '@/assets/user-img.jpg'

interface RankItemProps {
  index: number
}

export default function RankItem({ index }: RankItemProps) {
  return (
    <div
      className={`flex h-20 w-full gap-2 rounded-sm text-gray-800 ${
        index === 1 ? 'bg-yellow-300' : 'bg-gray-300'
      }`}
    >
      <div
        className={`flex items-center rounded-l-sm px-2 ${
          index === 1 ? 'bg-yellow-400' : 'bg-gray-400'
        }`}
      >
        {String(index).padStart(2, '0')}
      </div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-2">
          <img
            src={userImg}
            alt="Imagem de perfil do usuário"
            className="h-12 items-center rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-lg">Yuri Alberto</p>
            <p className="text-sm">125 Comentários</p>
            <p className="text-sm">10 Publicações</p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-lg">+43</div>
      </div>
    </div>
  )
}
