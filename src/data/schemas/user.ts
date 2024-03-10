import { z } from 'zod'

export const createUserSchema = z.object({ email: z.string(), name: z.string(), userId: z.string(), organizationId: z.string() })
