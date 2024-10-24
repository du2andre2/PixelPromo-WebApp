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
      <div className="w-app flex min-h-screen items-center justify-center border">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mx-auto mt-10 flex w-96 flex-col gap-4 rounded-md bg-gray-800 p-6 text-white"
        >
          <div className="mb-4 flex justify-between border-b border-gray-700">
            <a
              href="/signup"
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
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="rounded-md bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register('password')}
            type="password"
            placeholder="Senha"
            className="rounded-md bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Button
            type="submit"
            className="mt-6 w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  )
}
