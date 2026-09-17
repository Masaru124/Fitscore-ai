import { NextResponse, type NextRequest } from "next/server";

// ponytail: Native Next.js middleware replacing manual ProtectedRoute wrappers
export function middleware(request: NextRequest) {
  const token = request.cookies.get("fitscore_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/workout") ||
    pathname.startsWith("/history") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/session") ||
    pathname.startsWith("/profile");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workout/:path*",
    "/history/:path*",
    "/reports/:path*",
    "/session/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
