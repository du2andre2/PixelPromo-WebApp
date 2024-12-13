import { api } from "@/lib/axios";
import { cookies } from "next/headers";

export interface PromotionInteractionProps {
    id?: string;              
    promotionId: string;      
    ownerUserId?: string;     
    userId: string;           
    comment?: string;         
    interactionType: InteractionType; 
    createdAt?: Date;         
}

export type InteractionType = 'favorite' | 'like' | 'comment' | 'create';

const getAuthHeaders = () => {
    const token = cookies().get("token");
    return {
        Authorization: `Bearer ${token?.value}`,
    };
};

export async function createInteraction(interaction: PromotionInteractionProps) {
    try {
        const response = await api.post("/interactions", interaction, {
            headers: getAuthHeaders(),
        });
        if (response.status !== 201) {
            console.log(response);
            throw new Error("Error creating interaction");
        }
        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao criar interação:", error);
        throw error;
    }
}

export async function getCommentsByPromotionId(promotionId: string) {
    try {
        const response = await api.get<PromotionInteractionProps[]>(`/interactions/comments/${promotionId}`, {
            headers: getAuthHeaders(),
        });
        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error fetching comments for promotion");
        }
        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar comentários da promoção:", error);
        throw error;
    }
}

export async function getInteractionStatisticsByPromotionId(promotionId: string) {
    try {
        const response = await api.get(`/interactions/statistics/${promotionId}`, {
            headers: getAuthHeaders(),
        });
        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error fetching interaction statistics for promotion");
        }
        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar estatísticas de interações da promoção:", error);
        throw error;
    }
}
