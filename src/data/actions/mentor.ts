'use server'

import { revalidateTag } from 'next/cache'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { assignMentorToMenteeSchema, createMentorSchema } from '@/data/schemas/mentor'

export const createMentor = action(createMentorSchema, async ({ name, email, referrerEmail, organizationId }) => {
  const newMentor = await prisma.organization.update({
    data: {
      users: {
        create: {
          role: 'MENTOR',
          user: {
            create: {
              email,
              name,
              referredBy: {
                create: { referrerEmail },
              },
            },
          },
        },
      },
    },
    where: {
      id: organizationId,
    },
  })

  revalidateTag(`user-mentors`)
  return newMentor
})

export const assignMentorToMentee = action(assignMentorToMenteeSchema, async ({ menteeId, mentorId }) => {
  const newMentor = await prisma.mentorMentee.create({
    data: {
      menteeId,
      mentorId,
    },
  })

  revalidateTag(`user-mentors`)
  return newMentor
})
