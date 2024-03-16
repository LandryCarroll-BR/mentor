import { z } from 'zod'
import { action } from '@/lib/safe-action'
import prisma from '@/lib/prisma'

export const fetchUser = action(z.object({ email: z.string() }), async ({ email }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, password: true, id: true, name: true, image: true },
  })
  return user
})
