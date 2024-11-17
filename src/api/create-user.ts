import { api } from '@/lib/axios'
import { User } from './get-user'

export interface createUserProps {
  user: User
}

export async function createUser({
  user,
}: createUserProps) {
 
  try {
    const response = await api.post<User>('/users', user) 

    if (response.status === 200) {
      return response.data;  
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error: ', error);
    return null;
  }
}
