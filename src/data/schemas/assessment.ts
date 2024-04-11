import { z } from 'zod'

export const createAssessmentSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  organizationId: z.string(),
  passingScore: z.coerce.number(),
  userId: z.string(),
  questions: z.array(
    z.object({
      title: z.string(),
      description: z.optional(z.string()),
      youtubeUrl: z.optional(z.string()),
      // correctAnswer: z.enum(['a', 'b', 'c', 'd']),
      choiceA: z.object({
        text: z.string(),
        isCorrect: z.boolean(),
      }),
      choiceB: z.object({
        text: z.string(),
        isCorrect: z.boolean(),
      }),
      choiceC: z.object({
        text: z.string(),
        isCorrect: z.boolean(),
      }),
      choiceD: z.object({
        text: z.string(),
        isCorrect: z.boolean(),
      }),
    })
  ),
})
