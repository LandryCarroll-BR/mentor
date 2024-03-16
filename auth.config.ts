import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  adapter: {
    ...PrismaAdapter(prisma),
    async createUser({ email, image, name }) {
      const newUser = await prisma.user.create({
        data: {
          email,
          image,
          name,
          organizations: {
            create: {
              role: 'ADMIN',
              organization: {
                create: {
                  name: 'My Organization',
                },
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          organizations: true,
        },
      })
      return newUser as {
        id: string
        name: string | null
        email: string
        emailVerified: Date | null
        image: string | null
      }
    },
  } as NextAuthConfig['adapter'],
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
