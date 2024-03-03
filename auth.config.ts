import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {},
  adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
  providers: [GoogleProvider], // Add providers with an empty array for now
} satisfies NextAuthConfig
