import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine(
    (file) => {
      if (!file) return true
      console.log('Tipo MIME do arquivo:', file.type)
      return (
        file.size <= MAX_UPLOAD_SIZE &&
        ['image/png', 'image/jpeg', 'image/pjpeg'].includes(file.type)
      )
    },
    {
      message: 'O arquivo deve ser PNG ou JPG e ter no máximo 3MB',
    },
  )

const createPromotionSchema = z.object({
  promotionImage: fileSchema,
  gameName: z.string().min(2, 'Nome do jogo é obrigatório'),
  gamePrice: z.string(),
  gamePriceWithDiscount: z.string(),
  gameDiscount: z.string().min(0, 'Desconto deve ser maior ou igual a 0'),
  gamePlatform: z.string().min(2, 'Plataforma é obrigatória'),
  gameURL: z.string().url('URL deve ser válida').min(2, 'URL é obrigatória'),
})

type CreatePromotionFormData = z.infer<typeof createPromotionSchema>

export default function CreatePromotionDialog() {
  const { handleSubmit, register, setValue } = useForm<CreatePromotionFormData>(
    {
      resolver: zodResolver(createPromotionSchema),
    },
  )

  const [preview, setPreview] = useState<string | null>(null)

  function formatPrice(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, '')

    if (value.length > 5) {
      value = value.slice(0, 5)
    }

    if (value.length >= 4) {
      value = value.replace(/^(\d{2,3})(\d{2})$/, '$1,$2')
    }

    setValue(event.target.name as keyof CreatePromotionFormData, value)
  }

  function formatDiscount(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, '')

    if (value.length > 3) {
      value = value.slice(0, 3)
    }

    const numericValue = parseInt(value, 10)
    if (numericValue > 100) {
      value = '100'
    }

    setValue(event.target.name as keyof CreatePromotionFormData, value)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  function handleCreatePromotion(data: CreatePromotionFormData) {
    console.log(data)
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
          {...register('promotionImage')}
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          required
        />
      </label>
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
          <div className="flex items-center space-x-2 rounded-md bg-gray-700 p-2 focus-within:ring-2 focus-within:ring-slate-200">
            <span className="text-slate-200">R$</span>
            <input
              type="text"
              className="w-full appearance-none bg-transparent outline-none"
              {...register('gamePrice')}
              onChange={formatPrice}
              required
            />
          </div>
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
          <div className="flex items-center space-x-2 rounded-md bg-gray-700 p-2 focus-within:ring-2 focus-within:ring-slate-200">
            <span className="text-slate-200">R$</span>
            <input
              type="text"
              className="w-full appearance-none bg-transparent outline-none"
              {...register('gamePriceWithDiscount')}
              onChange={formatPrice}
              required
            />
          </div>
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
        <div className="flex w-28 flex-col gap-1">
          <label>Desconto</label>
          <div className="flex items-center space-x-2 rounded-md bg-gray-700 p-2 focus-within:ring-2 focus-within:ring-slate-200">
            <input
              type="text"
              className="w-full appearance-none bg-transparent outline-none"
              {...register('gameDiscount')}
              onChange={formatDiscount}
              required
            />
            <span className="text-slate-200">%</span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full gap-4">
        <button
          type="button"
          className="w-full rounded-md bg-red-500 py-2 text-white hover:bg-red-700"
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
