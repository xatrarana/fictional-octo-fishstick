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

  //callbacks 
  callbacks: {
    async signIn({ user,account}) {
      return true;
    },


    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      // check if user has username
     
      return session;
    },
    async jwt({ token }) {
      return token
    },
  }
})

// before extednding sesison
// we have to modify jwt