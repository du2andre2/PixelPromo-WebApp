import axios from 'axios'

import { env } from '@/env'

if (!env.NEXT_PUBLIC_API) {
  throw new Error(
    'A variável de ambiente NEXT_PUBLIC_API não está definida.',
  )
}

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API,
})

