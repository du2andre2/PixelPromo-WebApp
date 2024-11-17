import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createPromotion } from '@/api/create-promotion'
import { Auth } from '@/api/login'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const fileSchema = z
  .custom<File>((value) => value instanceof File, {
    message: 'O arquivo deve ser uma instância válida de File',
  })
  .refine(
    (file) =>
      file &&
      file.size <= MAX_UPLOAD_SIZE &&
      ['image/png', 'image/jpeg'].includes(file.type),
    {
      message: 'O arquivo deve ser PNG ou JPG e ter no máximo 3MB',
    }
  )

const createPromotionSchema = z.object({
  promotionImage: fileSchema,
  gameName: z.string().min(2, 'Nome do jogo é obrigatório'),
  gamePrice: z
    .number({ invalid_type_error: 'O preço deve ser um número' })
    .positive('O preço deve ser maior que zero'),
  gamePriceWithDiscount: z
    .number({ invalid_type_error: 'O preço com desconto deve ser um número' })
    .positive('O preço com desconto deve ser maior que zero'),
  gamePlatform: z.string().min(2, 'Plataforma é obrigatória'),
  gameURL: z.string().url('URL deve ser válida').min(2, 'URL é obrigatória'),
})

type CreatePromotionFormData = z.infer<typeof createPromotionSchema>

interface CreatePromotionProps {
  onClose: () => void
  auth: Auth
}

export default function CreatePromotionDialog({ onClose, auth }: CreatePromotionProps) {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm<CreatePromotionFormData>({
    resolver: zodResolver(createPromotionSchema),
  })

  const { mutateAsync: createPromotionFn } = useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      onClose()
    },
  })

  const [preview, setPreview] = useState<string | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? undefined
    if (file) {
      setValue('promotionImage', file, { shouldValidate: true })
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  async function handleCreatePromotion(data: CreatePromotionFormData) {
    const promotionData = {
      userId: auth.userId,
      title: data.gameName,
      originalPrice: data.gamePrice,
      discountedPrice: data.gamePriceWithDiscount,
      platform: data.gamePlatform,
      link: data.gameURL,
      categories: [], // Adicione categorias se necessário
    }

    console.log('promotionData:', promotionData)
    await createPromotionFn({
      promotion: promotionData,
      image: data.promotionImage!,
      auth: auth
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreatePromotion)}
      className="mx-auto mt-2 flex w-full flex-col items-center gap-4 rounded-md bg-gray-800 text-white"
    >
      <label className="relative flex h-24 w-52 cursor-pointer items-center justify-center rounded-md border border-gray-200 hover:border-gray-400">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <span className="text-sm text-slate-200">Adicione uma imagem</span>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          required
        />
      </label>
      {errors.promotionImage && (
        <p className="text-red-500">{errors.promotionImage.message}</p>
      )}
      <div className="flex w-full gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label>Nome do jogo</label>
          <input
            type="text"
            className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
            {...register('gameName')}
            required
          />
        </div>
        <div className="flex w-28 flex-col gap-1">
          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
            {...register('gamePrice', { valueAsNumber: true })}
            required
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label>Plataforma</label>
          <input
            type="text"
            className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
            {...register('gamePlatform')}
            required
          />
        </div>
        <div className="flex w-28 flex-col gap-1">
          <label>Novo preço</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
            {...register('gamePriceWithDiscount', { valueAsNumber: true })}
            required
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label>URL da promoção</label>
          <input
            type="text"
            className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
            {...register('gameURL')}
            required
          />
        </div>
      </div>
      <div className="mt-2 flex w-full gap-4">
        <button
          type="button"
          className="w-full rounded-md bg-red-500 py-2 text-white hover:bg-red-700"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-700"
        >
          Cadastrar
        </button>
      </div>
    </form>
  )
}
