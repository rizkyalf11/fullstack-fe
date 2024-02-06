import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  secret: 'asdajsdhy8avd',
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any, req) {
        return {
          ...credentials
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      console.log("🚀 ~ jwt ~ user:", user)
      console.log("🚀 ~ jwt ~ token:", token)
      console.log('jwt di panggil')
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return {
        ...token,
        ...user,
      };
    },

    async session({ session, user, token }) {
      console.log('session di panggil')
      console.log(token);
      session.user.id = Number(token.id);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error",
  },
}

export default NextAuth(authOptions)