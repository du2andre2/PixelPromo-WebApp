import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
import { createUser } from '@/api/create-user'

const signUpFormSchema = z
  .object({
    name: z.string().min(2, 'Escreva seu nome'),
    email: z.string().email('Insira um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, { message: 'Mínimo de 6 caracteres ' }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Senhas não são iguais',
    path: ['confirmPassword'],
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const auth = Cookies.get('auth');
  if (auth) {
    window.location.href = '/home'; 
    return null;
  }

  async function handleRegister(data: SignUpFormData) {
    try {
      await createUser({ user: data });
      window.location.href = '/sign-in'; 
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <>
      <Helmet title="Register" />
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mx-auto mt-10 flex w-96 flex-col gap-4 rounded-md bg-gray-800 p-6 text-white"
        >
          <div className="mb-4 flex justify-between border-b border-gray-700">
            <Button
              type="button"
              className="w-1/2 border-b-2 border-green-500 py-2 text-white focus:outline-none"
            >
              Criar Conta
            </Button>

            <a
              href="/"
              className="w-1/2 py-2 text-center text-gray-400 focus:outline-none"
            >
              Entrar
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <label>Nome</label>
            <input
              {...register('name')}
              placeholder="Fulano de tal"
              className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="nome@email.com"
              className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Senha</label>
            <input
              {...register('password')}
              type="password"
              placeholder="******"
              className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Confirmar senha</label>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="******"
              className="rounded-md bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-6 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-700"
          >
            Cadastrar-se
          </Button>
        </form>
      </div>
    </>
  )
}
