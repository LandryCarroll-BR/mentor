import { z } from 'zod'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'

export const fetchMentorsByOrganization = action(z.object({ organizationId: z.string() }), async ({ organizationId }) => {
  return await prisma.userOrganization.findMany({
    where: {
      role: 'MENTOR',
      organizationId,
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          mentorAssignments: {
            select: {
              mentor: {
                select: {
                  name: true,
                },
              },
              mentee: {
                select: {
                  name: true,
                },
              },
            },
          },
          menteeAssignments: {
            select: {
              mentor: {
                select: {
                  name: true,
                },
              },
              mentee: {
                select: {
                  name: true,
                },
              },
            },
          },
          referredBy: {
            select: {
              referrerEmail: true,
              isCompleted: true,
            },
          },
        },
      },
    },
  })
})
