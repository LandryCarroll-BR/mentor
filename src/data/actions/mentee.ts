'use server'

import { revalidateTag } from 'next/cache'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { createMenteeSchema } from '@/data/schemas/mentee'

export const createMentee = action(createMenteeSchema, async ({ name, organizationId }) => {
  const newMentee = await prisma.organization.update({
    data: {
      users: {
        create: {
          role: 'MENTEE',
          user: {
            create: {
              name,
            },
          },
        },
      },
    },
    where: {
      id: organizationId,
    },
  })

  revalidateTag(`user-mentees`)

  return newMentee
})
