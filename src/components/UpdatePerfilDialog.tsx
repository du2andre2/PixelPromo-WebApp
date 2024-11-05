import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
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

const updatePerfilFormSchema = z.object({
  userImage: fileSchema,
  name: z.string().min(2).optional(),
})

type UpdatePerfilData = z.infer<typeof updatePerfilFormSchema>

export default function UpdatePerfilDialog() {
  const [preview, setPreview] = useState<string | null>(null)

  const { register, handleSubmit } = useForm<UpdatePerfilData>({
    resolver: zodResolver(updatePerfilFormSchema),
  })

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  function handleUpdatePerfil(data: UpdatePerfilData) {
    console.log(data)
  }

  return (
    <form
      className="mx-auto flex w-full flex-col items-center gap-4 rounded-md bg-gray-800 text-white"
      onSubmit={handleSubmit(handleUpdatePerfil)}
    >
      <label className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-gray-200 hover:border-gray-400">
        {' '}
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <Camera className="h-8 w-8 text-gray-400" />
        )}
        <input
          type="file"
          {...register('userImage')}
          onChange={handleFileChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          required
        />
      </label>

      <div className="flex flex-1 flex-col gap-1">
        <label>Novo nome</label>
        <input
          type="text"
          className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
          {...register('name')}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-700"
      >
        Atualizar perfil
      </button>
    </form>
  )
}
