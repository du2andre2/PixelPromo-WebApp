import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { PublishedOfferRow } from './TableRow'
import { PromotionCard } from '@/api/get-promotion'
import { Auth } from '@/api/login'


interface PublishedOffersTableProps {
  auth: Auth
  promotions: PromotionCard[]
  onDelete: () => void
}

export default function PublishedOffersTable( {auth,promotions,onDelete}: PublishedOffersTableProps) {
  return (
    <Table className="border border-gray-200 shadow-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="w-16"></TableHead>
          <TableHead className="w-40 text-slate-200">Nome do jogo</TableHead>
          <TableHead className="w-32 text-slate-200">Plataforma</TableHead>
          <TableHead className="w-24 text-slate-200">Preço</TableHead>
          <TableHead className="w-20 text-slate-200">Desconto</TableHead>
          <TableHead className="w-20 text-slate-200">Likes</TableHead>
          <TableHead className="w-32"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {promotions &&
        promotions.map((promotionCard) => (
          <PublishedOfferRow key={promotionCard.promotion.id} promotionCard={promotionCard} onDelete={onDelete} auth={auth} />
        ))}
      </TableBody>
    </Table>
  )
}
