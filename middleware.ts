// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Publicly accessible routes (no auth required)
const PUBLIC_PATHS = ["/login", "/admin/login", "/register", "/"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl;

  const isPublic = PUBLIC_PATHS.includes(url.pathname);

  // ✅ Allow public routes freely
  if (isPublic) return NextResponse.next();

  if (url.pathname.startsWith("/admin") && !token) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  // ✅ Block all private routes if no token
  if (!token) return NextResponse.redirect(new URL("/login", url));

  // ✅ Check for admin-only access
  const isAdminRoute = url.pathname.startsWith("/admin");

  // For now, decode JWT manually (can be improved with a utility)
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload)); // contains { userId, role }

  if (isAdminRoute && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", url));
  }

  // ✅ Allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // Protect these
};
