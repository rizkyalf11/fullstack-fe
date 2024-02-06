import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("token", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/login",
      error: '/api/auth/error',
    },
  }
);

export const config = { matcher: ["/admin", "/admin/:path*"] };