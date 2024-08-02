import NextAuth from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { useCurrentUser } from "./hooks/use-current-user"
import { getUserById } from "./data/user"



export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  trustHost: true,

  //callbacks 
  callbacks: {
    async jwt({ token, user }) {
      const unixTimestamp = token.exp!;

      const originalTimestampInMilliseconds = unixTimestamp * 1000;

      const newTimestampInMilliseconds = originalTimestampInMilliseconds + (30 * 60 * 1000);

      const newUnixTimestamp = Math.floor(newTimestampInMilliseconds / 1000);


      token.exp = newUnixTimestamp;



      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }


      const user = await getUserById(session.user.id)

      if (user?.roleId) session.user.roleId = user?.roleId;
      if (user?.username) session.user.username = user?.username;

      const timestampInMilliseconds = token.exp! * 1000;

      const date = new Date(timestampInMilliseconds);

      const isoString = date.toISOString();
      //@ts-ignore
      session.expires = isoString;

      return session;
    }
  }
})

// before extednding sesison
// we have to modify jwt