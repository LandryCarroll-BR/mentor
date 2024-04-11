'use server'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { createUserSchema } from '@/data/schemas/user'
import { revalidateTag } from 'next/cache'

export const createUser = action(createUserSchema, async ({}) => {
  const user = await prisma.user.create({
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

  revalidateTag('user')

  return user
})
