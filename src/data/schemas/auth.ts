import { z } from 'zod'

export const signInWithEmailSchema = z.object({
  email: z.string().min(1, 'Required'),
})

export const signInWithProviderSchema = z.object({
  provider: z.string(),
})
