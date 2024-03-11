import { z } from 'zod'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'

export const fetchMenteesByOrganization = action(z.object({ organizationId: z.string() }), async ({ organizationId }) => {
  return await prisma.userOrganization.findMany({
    where: {
      role: 'MENTEE',
      organizationId,
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
})
