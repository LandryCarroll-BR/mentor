'use server'

import { revalidateTag } from 'next/cache'

import prisma from '@/lib/prisma'
import { action } from '@/lib/safe-action'
import { createAssessmentSchema } from '../schemas/assessment'

export const createAssessment = action(createAssessmentSchema, async ({ title, description, questions, organizationId }) => {
  function reshapeQuestion(question: (typeof questions)[0]) {
    const { choiceA, choiceB, choiceC, choiceD, ...rest } = question

    return { choices: { create: [choiceA, choiceB, choiceC, choiceD] }, ...rest }
  }

  const reshapedQuestions = questions.map(reshapeQuestion)

  const newAssessment = await prisma.assessment.create({
    data: {
      title,
      description,
      organizationId,
      questions: {
        create: reshapedQuestions,
      },
    },
  })

  revalidateTag(`assessments`)

  return newAssessment
})
