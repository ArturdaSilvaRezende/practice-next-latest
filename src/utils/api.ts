const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface RequestOptions extends RequestInit {
  verify_auth?: boolean;
}

export async function api(endpoint: string, options: RequestOptions = {}) {
  const { verify_auth = true, ...rest } = options;

  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...rest.headers,
    },
  });

  if (response.status === 401 && verify_auth) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    throw new Error("Não autorizado");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { response: { status: response.status, data: errorData } };
  }

  return response.json();
}
