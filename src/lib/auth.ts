import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Email from "next-auth/providers/email"

import { env } from "@/lib/env"
import { authConfig } from "@/root/auth.config"

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Email({
      server: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
  callbacks: {},
})
