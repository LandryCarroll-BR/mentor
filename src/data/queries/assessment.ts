import { z } from 'zod'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'

export const fetchAssessmentsByOrganizationId = action(z.object({ organizationId: z.string() }), async ({ organizationId }) => {
  return await prisma.assessment.findMany({
    where: {
      organizationId,
    },
  })
})

export const fetchAssessmentsByUserId = action(z.object({ userId: z.string() }), async ({ userId }) => {
  return await prisma.assessmentToUser.findMany({
    where: {
      userId: userId,
    },
    select: {
      assessment: true,
    },
  })
})
