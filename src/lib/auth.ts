import NextAuth from 'next-auth'
import { authConfig } from '@/root/auth.config'
import GoogleProvider from 'next-auth/providers/google'

// @ts-ignore
export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {},
})
