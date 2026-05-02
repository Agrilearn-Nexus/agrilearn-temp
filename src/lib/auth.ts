import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
  },

  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      if (!user?.email) return false;
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (existingUser) {
        const alreadyLinked = existingUser.accounts.some(
          (acc) => acc.provider === "google",
        );

        if (!alreadyLinked && account) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token ?? null,
              token_type: account.token_type ?? null,
              scope: account.scope ?? null,
              id_token: account.id_token ?? null,
            },
          });
        }
      }
      return true;
    },

    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  trustHost: true,
});
