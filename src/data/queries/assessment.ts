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
