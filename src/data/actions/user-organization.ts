'use server'

import { revalidateTag } from 'next/cache'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { createUserOrgSchema } from '@/data/schemas/organization'

export const createUserOrganization = action(createUserOrgSchema, async ({ name, userId }) => {
  const newOrganization = await prisma.organization.create({ data: { name } })
  const newUserOrganization = await prisma.userOrganization.create({
    data: { role: 'ADMIN', userId, organizationId: newOrganization.id },
  })
  revalidateTag(`user-organization`)
  return newUserOrganization
})
