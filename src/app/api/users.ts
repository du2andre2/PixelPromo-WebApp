import { api } from "@/lib/axios";
import { cookies } from "next/headers";

export interface UserProps {
    id?: string;
    name: string;
    email: string;
    password?: string;
    pictureUrl?: string;
    totalScore?: number;
    level?: number;
    elo?: string;
    createdAt?: Date;
}

const getAuthHeaders = () => {
    const token = cookies().get("token");
    return {
        Authorization: `Bearer ${token?.value}`,
    };
};

export async function createUser({ name, email, password }: UserProps) {
    const response = await api.post("/users", { name, email, password }, {
        headers: getAuthHeaders(),
    });
    if (response.status < 200 || response.status >= 300) {
        console.log(response);
        throw new Error("Error creating user");
    }
    return response.data;
}

export async function getUserById(id: string) {
    try {
        const response = await api.get<UserProps>(`/users/${id}`, {
            headers: getAuthHeaders(),
        });
        if (response.status < 200 || response.status >= 300) {
            console.log(response);
            throw new Error("Error fetching user");
        }
        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        throw error;
    }
}

export interface UpdatePictureProps {
    id: string;
    imageFile: File;
}

export async function updatePicture({ id, imageFile }: UpdatePictureProps) {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await api.post(`/users/picture/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthHeaders(),
            },
        });

        if (response.status < 200 || response.status >= 300) {
            console.log(response);
            throw new Error("Error updating user picture");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao atualizar a imagem do usuário:", error);
        throw error;
    }
}

export async function getTopRankedUsers(limit: number = 3) {
    try {
        const response = await api.get<UserProps[]>(`/users/rank?limit=${limit}`, {
            headers: getAuthHeaders(),
        });
        if (response.status < 200 || response.status >= 300) {
            console.log(response);
            throw new Error("Error fetching top ranked users");
        }

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao buscar o ranking dos usuários:", error);
        throw error;
    }
}
