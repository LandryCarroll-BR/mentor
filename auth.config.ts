import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
