import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = !!(req.auth?.user.role === "ADMIN");

  const pathname = req.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isAdminRoute = pathname.startsWith("/admin");

  // 1. Not logged in → block admin
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // 2. Logged in but not admin → block admin
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 3. Redirect /admin → /admin/dashboard
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  // 4. Logged in users shouldn't see login
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*", "/auth/login"],
};
