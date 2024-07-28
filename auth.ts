import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"



export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  trustHost:true,

  //callbacks 
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

     
      return session;
    },
    async jwt({ token }) {
      token.exp = Math.floor(Date.now() / 1000) + 10 * 60;
      return token
    },
  }
})

// before extednding sesison
// we have to modify jwt