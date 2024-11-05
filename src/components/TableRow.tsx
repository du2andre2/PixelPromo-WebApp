import { Search, X } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { TableCell, TableRow } from '@/components/ui/table'

export function PublishedOfferRow() {
  const { id } = useParams()

  return (
    <TableRow>
      <TableCell className="flex justify-center">
        <Search size={18} />
      </TableCell>
      <TableCell className="truncate">
        The Legend of Zelda: Breath of the Wild
      </TableCell>
      <TableCell>Steam</TableCell>
      <TableCell>R$ 249,57</TableCell>
      <TableCell>23%</TableCell>
      <TableCell>27</TableCell>
      <TableCell>
        <button className="flex items-center justify-center gap-1 rounded-sm bg-red-500 px-2 py-0.5">
          Excluir
          <X size={16} className="mb-0.5" />
        </button>
      </TableCell>
    </TableRow>
  )
}
