import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any, req) {
        return {
          ...credentials
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account, profile }) {
      console.log("🚀 ~ jwt ~ user:", user)
      console.log("🚀 ~ jwt ~ token:", token)
      return {
        ...token,
        ...user
      }
    },
    async session({ session, user, token }) {
      console.log("🚀 ~ session ~ token:", token)
      console.log("🚀 ~ session ~ user:", user)
      
      session.user.id = Number(token.id);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      
      console.log("🚀 ~ session ~ session:", session)

      return session
    },
  },
}

export default NextAuth(authOptions)