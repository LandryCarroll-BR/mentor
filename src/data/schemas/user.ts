import { z } from 'zod'

export const createMenteeSchema = z.object({ email: z.string(), name: z.string(), userId: z.string(), organizationId: z.string() })
