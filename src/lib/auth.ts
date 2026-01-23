import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/lib/prisma"

const ALLOWED_EMAIL = "satyamkumarbgs066@gmail.com"

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "database",
    },

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: false,
        }),
    ],

    callbacks: {
        async signIn({user, account}) {
            if (account?.provider !== "google") return false

            if (!user?.email) return false
            if (user.email.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) return false

            return true
        },

        async session({session, user}) {
            if (session?.user) {
                session.user.id = user.id
            }
            return session
        },
    },

    pages: {
        signIn: "/admin/auth/login",
        error: "/admin/auth/login",
    },

    debug: process.env.NODE_ENV !== "production",

    trustHost: true,
})
