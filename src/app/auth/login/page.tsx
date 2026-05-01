"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import { useTransition } from "react"

export default function AdminLoginPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get("error")
    const [isPending, startTransition] = useTransition()

    const handleLogin = () => {
        startTransition(async () => {
            await signIn("google", { redirectTo: "/admin/dashboard" })
        })
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#f7fbf9] px-4">
            {/* Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,#dcfce7_0%,#f7fbf9_35%,#ffffff_70%)]" />

            {/* Card */}
            <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white/90 backdrop-blur-xl p-8 shadow-xl shadow-green-100/40">

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 shadow-inner">
                        <Image
                            src="/logo.jpeg"
                            alt="AgriLearn Nexus"
                            height={64}
                            width={64}
                            className="rounded-full object-cover"
                            priority
                        />
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        AgriLearn Nexus
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Secure Admin Access Portal
                    </p>
                </div>

                {/* Error */}
                {error === "AccessDenied" && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                        🚫 Access Restricted — Unauthorized account
                    </div>
                )}

                {/* Login */}
                <div className="mt-8">
                    <button
                        onClick={handleLogin}
                        disabled={isPending}
                        className="group flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-500" />
                        ) : (
                            <FcGoogle className="h-6 w-6" />
                        )}

                        <span className="text-base">
              {isPending ? "Signing in..." : "Continue with Google"}
            </span>
                    </button>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-gray-400">
                    🔐 Restricted System · Authorized Personnel Only
                </p>
            </div>
        </div>
    )
}
