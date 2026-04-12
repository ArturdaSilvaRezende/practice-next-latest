// app/actions/auth.ts
'use server'

import { cookies } from "next/headers";

export async function loginAction(data: any) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Falha no login' };
    }

    const cookieStore = await cookies();
    cookieStore.set('session_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

  
    return { 
      success: true, 
      userData: {
        token: String(result.token),
        name: String(result.name),
        id: result.user_id 
      } 
    }
  } catch (error: any) {
    console.error("ERRO NA ACTION:", error.message);
    return { success: false, error: "Erro de conexão com o servidor" };
  }
}