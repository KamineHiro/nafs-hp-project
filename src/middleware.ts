import { withAuth } from "next-auth/middleware"

// /admin/login 以外の /admin/* パスを保護
export default withAuth(
  function middleware() {
    return
  },
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin',
    '/admin/((?!login).)*'
  ]
} 