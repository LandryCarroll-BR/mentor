'use server'

import { revalidateTag } from 'next/cache'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { createUserOrgSchema, updateUserOrgSchema } from '@/data/schemas/organization'

export const createUserOrganization = action(createUserOrgSchema, async ({ name, userId }) => {
  const newOrganization = await prisma.organization.create({ data: { name } })
  const newUserOrganization = await prisma.userOrganization.create({
    data: { role: 'ADMIN', userId, organizationId: newOrganization.id },
  })

  revalidateTag(`user-organization`)

  return newUserOrganization
})

export const updateUserOrganization = action(updateUserOrgSchema, async ({ organizationName, userId, organizationId }) => {
  const newUserOrganization = await prisma.userOrganization.update({
    data: {
      organization: {
        update: { name: organizationName },
      },
    },
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  })

  revalidateTag(`user-organization`)

  return newUserOrganization
})
