import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    <div className="flex min-h-screen w-app items-center justify-center border">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 p-6 bg-gray-800 rounded-md w-96 mx-auto mt-10 text-white"
      >
        <div className="flex justify-between mb-4 border-b border-gray-700">
          
          <a
            href="/signup"
            className="text-gray-400 py-2 w-1/2 text-center focus:outline-none"
          >
            Criar Conta
          </a>

          <button
            type="button"
            className="text-white py-2 w-1/2 border-b-2 border-green-500 focus:outline-none"
          >
            Entrar
          </button>
        </div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          {...register('password')}
          type="password"
          placeholder="Senha"
          className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 rounded-md text-white hover:bg-green-700 mt-6"
        >
          Login
        </button>
      </form>
    </div>
  )
}
