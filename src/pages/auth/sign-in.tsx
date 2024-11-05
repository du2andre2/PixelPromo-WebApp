import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const loginFormSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function handleLogin(data: LoginFormData) {
    console.log(data)
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mx-auto mt-10 flex w-96 flex-col gap-4 rounded-md bg-gray-800 p-6 text-white"
        >
          <div className="mb-4 flex justify-between border-b border-gray-700">
            <a
              href="/sign-up"
              className="w-1/2 py-2 text-center text-gray-400 focus:outline-none"
            >
              Criar Conta
            </a>

            <Button
              type="button"
              className="w-1/2 border-b-2 border-green-500 py-2 text-white focus:outline-none"
            >
              Entrar
            </Button>
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

          <Button
            type="submit"
            className="mt-6 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-700"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  )
}
