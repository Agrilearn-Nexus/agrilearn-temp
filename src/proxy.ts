import {auth} from "@/lib/auth"
import {NextResponse} from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth

    const isAuthPage = req.nextUrl.pathname.startsWith("/admin/auth/login")
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/admin") && !isAuthPage

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/admin/auth/login", req.nextUrl))
    }

    if (isAuthPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*"],
}
