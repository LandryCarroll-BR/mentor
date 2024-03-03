import NextAuth from "next-auth"
import { authConfig } from "@/root/auth.config"

export default NextAuth(authConfig)

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
