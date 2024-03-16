'use server'

import { signIn } from '@/lib/auth'
import { action } from '@/lib/safe-action'
import { signInWithEmailSchema, signInWithProviderSchema } from '@/data/schemas/auth'

export const signInWithEmail = action(signInWithEmailSchema, async ({ email }) => {
  const formData = new FormData()
  formData.append('email', email)
  await signIn('email', formData)
})

export const signInWithProvider = action(signInWithProviderSchema, async ({ provider }) => {
  await signIn(provider)
})
