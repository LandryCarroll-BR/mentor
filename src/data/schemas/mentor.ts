import { z } from 'zod'

export const mentorRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  referrerEmail: z.string().email(),
  organizationId: z.string(),
})
