import { ExternalLink, Heart, ThumbsUp } from 'lucide-react'

import gameImage from '@/assets/game-exemple.jpg'
import userImg from '@/assets/user-img.jpg'

export default function GameCard() {
  return (
    <div className="flex h-52 w-52 flex-col rounded-sm border border-gray-700 bg-gray-800">
      <div className="flex flex-1 items-center justify-center gap-2 border-b border-gray-700">
        <img src={gameImage} alt="Imagem do jogo" />
      </div>
      <div className="m-2 flex flex-1 flex-col">
        <div className="flex basis-4/5">
          <div className="flex flex-1 flex-col gap-0">
            <div className="flex basis-3/4">
              <div className="flex flex-1 flex-col">
                <p className="text-sm line-through">R$ 24,99</p>
                <p>R$ 18,74</p>
              </div>
              <div className="mr-10 mt-2 h-fit rounded-md bg-green-500 p-1 text-sm">
                -25%
              </div>
            </div>
            <div className="basis-1/4">Stardew Valley</div>
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
          <p className="flex items-center gap-2">
            Steam <ExternalLink size={16} />
          </p>
          <div className="flex items-center gap-2">
            <Heart size={16} />
            <div className="flex items-center gap-1 rounded-sm border border-slate-200 px-1 text-sm">
              235
              <ThumbsUp size={16} className="pb-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
