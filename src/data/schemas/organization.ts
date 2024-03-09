import { z } from 'zod'

export const createUserOrgSchema = z.object({ name: z.string(), userId: z.string() })
