import { z } from 'zod'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'

export const fetchUserOrganization = action(
  z.object({ userId: z.string(), organizationId: z.string() }),
  async ({ userId, organizationId }) => {
    return await prisma.userOrganization.findUnique({
      where: { userId_organizationId: { userId, organizationId } },
      select: {
        role: true,
        organization: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    })
  }
)

export const fetchAllUserOrganizations = action(z.object({ userId: z.string() }), async ({ userId }) => {
  return await prisma.userOrganization.findMany({
    where: { userId },
    select: {
      role: true,
      organization: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })
})
