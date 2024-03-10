import { z } from 'zod'

export const createMenteeSchema = z.object({
  name: z.string(),
  organizationId: z.string(),
})
