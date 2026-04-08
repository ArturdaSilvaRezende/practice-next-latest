"use client";

import { api } from "@/src/utils/api";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextData {
  onAuth: (props: any) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<LoginContextData>({} as LoginContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  async function onAuth(props: any) {
    try {
      setIsLoading(true);

      const body = {
        username: props.username,
        password: props.password,
        id_unity: props.id_unity ? Number(props.id_unity) : null,
      };

      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const token = String(data?.token);
      const userId = data?.user_id;
      const name = data?.name;

      if (typeof window !== "undefined") {
        localStorage.setItem("id_unity", String(props.id_unity));
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", String(userId));
        localStorage.setItem("name", String(name));
      }

      if (userId) {
        try {
          await api("/claim-user/release-all", {
            method: "POST",
            body: JSON.stringify({ id_user: userId }),
            headers: { Authorization: `Bearer ${token}` }, // Exemplo de envio manual
          });
        } catch (err) {
          console.warn("Falha ao liberar claims:", err);
          // toast.warn('Não foi possível liberar suas claims agora.');
        }
      }

      // toast.success('Logado com sucesso');
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Falha no login";
      console.error("Erro de autenticação:", message);
      // toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ onAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
