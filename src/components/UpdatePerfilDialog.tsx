import { UserCard } from '@/api/get-user'
import { Auth } from '@/api/login'
import { updateUser } from '@/api/update-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

// Esquema de validação para o campo de imagem
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
).optional()

const updatePerfilFormSchema = z
  .object({
    userImage: fileSchema,
    name: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Verifica se ambos os campos estão vazios
    if (!data.userImage && !data.name) {
      ctx.addIssue({
        code: 'custom',
        message: 'Pelo menos um campo deve ser preenchido.',
        path: ['name'], // O erro será associado ao campo "name"
      });
    }
  });
  

type UpdatePerfilData = z.infer<typeof updatePerfilFormSchema>;

interface UpdatePerfilDialogProps {
  auth: Auth;
  userCard: UserCard;
  onClose: () => void;
}

export default function UpdatePerfilDialog({
  auth,
  userCard,
  onClose,
}: UpdatePerfilDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdatePerfilData>({
    resolver: zodResolver(updatePerfilFormSchema),
  });

  const { mutateAsync: updateUserFn } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onClose();
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? undefined;
    if (file) {
      setValue('userImage', file, { shouldValidate: true }); 
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  async function handleUpdatePerfil(data: UpdatePerfilData) {
    userCard.user.name = data.name || userCard.user.name;

    await updateUserFn({
      auth: auth,
      user: userCard.user,
      image: data.userImage || null,
    });
  }

  return (
    <form
      className="mx-auto flex w-full flex-col items-center gap-4 rounded-md bg-gray-800 text-white"
      onSubmit={handleSubmit(handleUpdatePerfil)}
    >
      <label className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-gray-200 hover:border-gray-400">
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
          onChange={handleFileChange} 
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      {errors.userImage && (
          <p className="text-red-500">{errors.userImage.message}</p>
        )}
      <div className="flex flex-1 flex-col gap-1">
        <label>Novo nome</label>
        <input
          type="text"
          className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-700"
      >
        Atualizar perfil
      </button>
    </form>
  );
}
