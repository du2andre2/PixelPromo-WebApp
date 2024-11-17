import { Search } from 'lucide-react'

import { TableCell, TableRow } from '@/components/ui/table'
import { PromotionCard } from '@/api/get-promotion'
import { Link } from 'react-router-dom'
import { deletePromotion } from '@/api/delete-promotion';
import { useMutation } from '@tanstack/react-query';
import { Auth } from '@/api/login';

interface PublishedOfferRowProps {
  auth: Auth;
  promotionCard: PromotionCard;
  onDelete: () => void;
}

export function PublishedOfferRow({ auth,promotionCard, onDelete }: PublishedOfferRowProps) {
 
  const { mutateAsync: deleteUserFn } = useMutation({
    mutationFn: deletePromotion,
    onSuccess: () => {
      onDelete();
    },
  });

  async function handleDelete() {
    try {
      await deleteUserFn({ promotionId: promotionCard.promotion.id ,auth: auth});
    } catch (error) {
      console.error('Erro ao deletar promoção:', error);
    } 
  }

  return (
    <TableRow>
      <TableCell className="flex justify-center">
        <Link to={`/promotion/${promotionCard.promotion.id}`}>
          <Search size={18} />
        </Link>
      </TableCell>
      <TableCell className="truncate">{promotionCard.promotion.title}</TableCell>
      <TableCell>{promotionCard.promotion.platform}</TableCell>
      <TableCell>R$ {promotionCard.promotion.discountedPrice}</TableCell>
      <TableCell>% {promotionCard.promotion.discountBadge}</TableCell>
      <TableCell>{promotionCard.promotionInteractions.like}</TableCell>
      <TableCell>
        {promotionCard.user.id === auth.userId ? <button
            onClick={handleDelete}
            className='flex items-center justify-center gap-1 rounded-sm px-2 py-0.5  bg-gray-400 bg-red-500 hover:bg-red-700'>      
            Excluir
          </button> : 
          <button
            className='flex items-center justify-center gap-1 rounded-sm px-2 py-0.5  bg-gray-400 bg-red-500 hover:bg-red-700'>      
            Denunciar
          </button>
        }
      </TableCell>
    </TableRow>
  );
}
