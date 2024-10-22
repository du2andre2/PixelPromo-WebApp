"use client";

import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function SigninForm() {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleLogin(data: LoginFormData) {
    try {
      await signIn("credentials", {
        ...data,
        callbackUrl: "/home",
      });
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-4 p-6 bg-gray-800 rounded-md w-96 mx-auto mt-10 text-white"
    >
      <div className="flex justify-between mb-4 border-b border-gray-700">
        <Link href="/signup" className="text-gray-400 py-2 w-1/2 text-center focus:outline-none">
          Criar Conta
        </Link>
          
        <button
          type="button"
          className="text-white py-2 w-1/2 border-b-2 border-green-500 focus:outline-none"
        >
          Entrar
        </button>
      </div>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message}</p>
      )}
      <input
        {...register("password")}
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
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}
    </form>
  );
}
