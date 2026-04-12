"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { loginAction } from "../actions/auth";

interface AuthContextData {
  user: { name: string; id: string } | null;
  onAuth: (data: any) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Recupera os dados ao carregar a página (F5)
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedId = localStorage.getItem("user_id");

    if (storedName && storedId) {
      setUser({ name: storedName, id: storedId });
    }
  }, []);

  async function onAuth(credentials: any) {
    try {
      setIsLoading(true);
      const result = await loginAction(credentials); 

      if (result.success && result.userData) {
        localStorage.setItem("name", result.userData.name);
        localStorage.setItem("user_id", String(result.userData.id));
        localStorage.setItem("id_unity", String(credentials.id_unity));
        localStorage.setItem("token", String(result.userData.token));

        setUser({ name: result.userData.name, id: result.userData.id });
        return { success: true };
      }

      return { success: false, error: result.error };
    } catch (err) {
      return { success: false, error: "Erro inesperado" };
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, onAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
