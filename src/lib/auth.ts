import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        
        const validUsername = process.env.ADMIN_USERNAME
        const validPassword = process.env.ADMIN_PASSWORD

        if (credentials.username === validUsername && 
            credentials.password === validPassword) {
          return {
            id: "1",
            name: "Administrator",
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      return session
    },
  }
} 