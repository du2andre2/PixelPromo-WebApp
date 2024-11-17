import { api } from '@/lib/axios';
import { Auth } from './login';

export interface PromotionInteractionsStatistics {
  comment: number;
  favorite: number;
  create: number;
  like: number;
}

const InteractionType = ['comment', 'favorite', 'create', 'like'] as const;
type InteractionType = typeof InteractionType[number];

export interface Interaction {
  promotionId: string;
  userId: string;
  interactionType: InteractionType;
  comment?: string;
}

export interface createInteractionsProps {
  interaction: Interaction;
  auth: Auth;
}

export async function createInteraction({
  interaction,
  auth,
}: createInteractionsProps): Promise<void> {
  try {
    await api.post(
      '/interactions',
      interaction,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
  } catch (error) {
    console.error('Erro ao criar interação:', error);
    throw new Error('Falha ao criar interação.');
  }
}
