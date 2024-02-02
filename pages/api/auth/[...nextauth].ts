import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        console.log("🚀 ~ authorize ~ req:", req)
        console.log('credentials', credentials)

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
  
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
}

export default NextAuth(authOptions)