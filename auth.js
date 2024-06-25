import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
const providers = [
  Credentials({
    credentials: {
      username: {},
      password: {},
    },
    async authorize(credentials, req) {
      console.log({credentials})
      return null;
    },
  }),
]

export const {handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
     strategy: 'jwt',
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup"
    
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      session.expires = new Date();
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
})