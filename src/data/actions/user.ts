'use server'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { createUserSchema } from '@/data/schemas/user'

export const createUser = action(createUserSchema, async ({}) => {
  return await prisma.user.create({
    data: {
      name: '',
      email: '',
      organizations: {
        connect: [
          {
            userId_organizationId: {
              userId: '',
              organizationId: '',
            },
            role: 'MENTEE',
          },
        ],
      },
    },
  })
})
