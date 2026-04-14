import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

async function request(endpoint: string, options: RequestInit = {}) {
  // 1. Busca o token nos cookies (Server Side)
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  // 2. Configuração de Headers padrão
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  });

  // 3. Execução do Fetch
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 4. Interceptor de Resposta (Equivalente ao seu código antigo)
  if (response.status === 401) {
    // No servidor, o redirect joga o usuário para a home
    redirect("/"); 
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return response.json();
}

export const api = {
  get: (url: string, options?: RequestInit) => 
    request(url, { ...options, method: "GET" }),
    
  post: (url: string, data: any, options?: RequestInit) => 
    request(url, { ...options, method: "POST", body: JSON.stringify(data) }),
    
  put: (url: string, data: any, options?: RequestInit) => 
    request(url, { ...options, method: "PUT", body: JSON.stringify(data) }),
    
  delete: (url: string, options?: RequestInit) => 
    request(url, { ...options, method: "DELETE" }),
};