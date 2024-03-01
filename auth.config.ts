import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const authConfig = {
	callbacks: {
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl
			if (pathname === '/recipes') return !!auth
			return true
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [GoogleProvider], // Add providers with an empty array for now
} satisfies NextAuthConfig
