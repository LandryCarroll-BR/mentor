import { z } from 'zod'

export const createUserOrgSchema = z.object({ name: z.string(), userId: z.string() })

export const updateUserOrgSchema = z.object({ organizationName: z.string(), userId: z.string(), organizationId: z.string() })
