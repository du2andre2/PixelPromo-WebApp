import { api } from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const response = await api.post("/auth", { email, password });

          if (response.status !== 200) {
            throw new Error("Invalid credentials");
          }

          const responseJson = response.data;
          const cookieStore = await cookies(); 
          cookieStore.set("token", responseJson.token);
          return { 
            id: responseJson.user.id,
            name: responseJson.user.name,
            email: responseJson.user.email 
          };
        } catch (error) {
          console.error("Login error: ", error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
