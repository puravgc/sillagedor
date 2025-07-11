import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          const [firstName = "", lastName = ""] = (user.name ?? "").split(" ");

          await prisma.user.create({
            data: {
              email: user.email!,
              firstName,
              lastName,
              location: [0.0, 0.0],
              isAdmin: false, // default non-admin users
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error storing user in DB:", error);
        return false;
      }
    },

    // ✅ Add this
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      token.isAdmin = userInDb?.isAdmin ?? false;
      return token;
    },

    // ✅ Add this
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
