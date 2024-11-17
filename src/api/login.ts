// src/services/auth.ts
import { api } from '@/lib/axios';
import Cookies from 'js-cookie';

export interface LoginProps {
  email: string;
  password: string;
}

export interface Auth {
  userId: string;
  token: string;
}

export async function login({ email, password }: LoginProps) {
  try {
    const response = await api.post('/auth', { email, password });

    if (response.status === 200) {
      const responseJson = response.data;

      const authUser = {
        userId: responseJson.user.id as string,
        token: responseJson.token as string
      }as Auth;
  

      Cookies.set('auth', JSON.stringify(authUser), { expires: 7 }); 
      return authUser;  
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error: ', error);
    return null;
  }
}
