// src/app/actions/auth.ts
"use server";

import { cookies } from "next/headers";

interface LoginResponse {
  success: boolean;
  userData?: {
    token: string;
    name: string;
    id: string | number;
  };
  error?: string;
}

export async function loginAction(data: any): Promise<LoginResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || "Falha no login" };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", result.token, { httpOnly: true, secure: true });
    cookieStore.set("user_name", result.name);

    return { success: true, userData: { token: result.token, name: result.name, id: result.id } };
  } catch (error) {
    return { success: false, error: "Erro de conexão com o servidor" };
  }
}
