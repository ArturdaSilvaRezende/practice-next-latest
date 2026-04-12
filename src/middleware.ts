import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Tudo de (auth) — adicione aqui apenas se criar novas rotas públicas
const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("session_token")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("auth_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // ✅ Tudo que NÃO for rota pública, é protegido — (main) inteiro coberto
  const isProtectedRoute = !isPublicRoute;

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/modules", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",],
};