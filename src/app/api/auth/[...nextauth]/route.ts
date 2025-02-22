import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" }
      },
      async authorize(credentials) {
        // 実際の環境では環境変数から取得
        const validUsername = "admin"
        const validPassword = "password123"

        if (credentials?.username === validUsername && 
            credentials?.password === validPassword) {
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
})

export { handler as GET, handler as POST } 