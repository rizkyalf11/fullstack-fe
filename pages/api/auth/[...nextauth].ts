import { axiosClient } from "@/lib/axiosClient"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"



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
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if(account?.provider == 'google') {
          const payload: any = {
            id: user.id,
            nama: user.name,
            avatar: user.image,
            email: user.email,
            id_token: account?.id_token 
          }
  
          await axiosClient.post('/auth/logingoogle', payload)
        }
        
        return true   
      } catch (error) {
        console.log(error);
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account, session, trigger }) {
      if(trigger == 'update') {
        return { ...token, ...session.user }
      }

      return {
        ...token,
        ...user,
        ...account,
      }
    },
    async session({ session, token }) {
      if(token.provider == 'google') {
        const { data } = await axiosClient.get(`/auth/getgoogledata/${token.id}`)

        session.user.id = data.data.id;
        session.user.name = data.data.nama;
        session.user.email = data.data.email;
        session.user.accessToken = data.data.access_token;
        session.user.refreshToken = data.data.refresh_token;
        session.user.role = data.data.role

        return session
      } else {
        console.log('cre')
        session.user.id = Number(token.id);
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.role = token.role 

        return session
      }
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/auth/error",
  },
}

export default NextAuth(authOptions)