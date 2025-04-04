import { api } from "@/lib/axios";
import { cookies } from "next/headers";

export interface PromotionProps {
    id?: string;
    userId?: string;
    title: string;
    description: string;
    originalPrice: string;
    discountedPrice: string;
    discountBadge?: string;
    platform: string;
    imageUrl?: string;
    link: string;
    categories: string[];
    createdAt?: Date;
}

export interface CategoryProps {
    name: string;
}

const getAuthHeaders = async () => {
    const cookieStore = await cookies(); // Aguarde a resolução da Promise
    const token = cookieStore.get("token"); // Agora pode acessar .get()
    
    return {
        Authorization: `Bearer ${token?.value}`,
    };
};

export async function createPromotion(promotion: PromotionProps) {
    try {
        const response = await api.post("/promotions", promotion, {
            headers: await getAuthHeaders(),
        });
        if (response.status !== 201) {
            console.log(response);
            throw new Error("Error creating promotion");
        }
        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao criar promoção:", error);
        throw error;
    }
}

export interface UpdatePromotionImageProps {
    id: string;
    imageFile: File;
}

export async function updatePromotionImage({ id, imageFile }: UpdatePromotionImageProps) {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const auth = await getAuthHeaders()
        const response = await api.post(`/promotions/image/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...auth,
            },
        });

        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error updating promotion image");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao atualizar a imagem da promoção:", error);
        throw error;
    }
}

export async function getPromotions(categories?: string[], search?: string) {
    try {
        const params = new URLSearchParams();
        if (categories && categories.length > 0) {
            categories.forEach((category) => params.append("category", category));
        }
        if (search) {
            params.append("search", search);
        }

        const response = await api.get<PromotionProps[]>(`/promotions?${params.toString()}`, {
            headers:await getAuthHeaders(),
        });
        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error fetching promotions");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar promoções:", error);
        throw error;
    }
}

export async function getPromotionById(id: string) {
    try {
        const response = await api.get<PromotionProps>(`/promotions/${id}`, {
            headers:await getAuthHeaders(),
        });
        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error fetching promotion");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar promoção por ID:", error);
        throw error;
    }
}

export async function getFavoritesPromotionsByUserId(userId: string) {
    try {
        const response = await api.get<PromotionProps[]>(`/promotions/favorites/${userId}`, {
            headers: await getAuthHeaders(),
        });
        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error fetching favorite promotions");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar promoções favoritas do usuário:", error);
        throw error;
    }
}

export async function getCategories() {
    try {
        const response = await api.get<CategoryProps[]>("/categories", {
            headers: await getAuthHeaders(),
        });
        if (response.status !== 200) {
            console.log(response);
            throw new Error("Error fetching categories");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
}
