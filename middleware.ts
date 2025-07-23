// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Publicly accessible routes (no auth required)
const PUBLIC_PATHS = ["/login", "/admin/login", "/register", "/"];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const isPublic = PUBLIC_PATHS.includes(url.pathname);

  // ✅ Allow public routes freely
  if (isPublic) return NextResponse.next();

  // ✅ Check for admin-only access
  const adminToken = request.cookies.get("token")?.value; // admin token
  const customerToken = request.cookies.get("customer_token")?.value;
  const isAdminRoute = url.pathname.startsWith("/admin");
  const token = isAdminRoute ? adminToken : customerToken;
  if (url.pathname.startsWith("/admin") && !token) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (!token) {
    const redirectPath = isAdminRoute ? "/admin/login" : "/login";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
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
