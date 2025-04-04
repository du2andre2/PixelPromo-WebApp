"use client";

import { z } from "zod";
import { createUser, UserProps } from "../api/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signupFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type SignupFormdData = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const { handleSubmit, register, formState: { errors } } = useForm<SignupFormdData>({
    resolver: zodResolver(signupFormSchema),
  });


  async function handleSignup(data: UserProps) {
    try {
      await createUser(data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex flex-col gap-4 p-6 bg-gray-800 rounded-md w-96 mx-auto mt-10 text-white"
    >
      <div className="flex justify-between mb-4 border-b border-gray-700">
        <button
          type="button"
          className="text-white py-2 w-1/2 border-b-2 border-green-500 focus:outline-none"
        >
          Criar Conta
        </button>
        <a href="/" className="text-gray-400 py-2 w-1/2 text-center focus:outline-none">
          Entrar
        </a>
      </div>
      <input
        {...register("name")}
        placeholder="Nome"
        className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <input
        {...register("email")}
        placeholder="Email"
        className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="Senha"
        className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <button
        type="submit"
        className="w-full py-2 bg-green-600 rounded-md text-white hover:bg-green-700 mt-6"
      >
        Criar conta
      </button>
    </form>
  );
}
