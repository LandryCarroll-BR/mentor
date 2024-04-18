import { z } from 'zod'

export const createMentorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  referrerEmail: z.string().email(),
  organizationId: z.string(),
})

export const assignMentorToMenteeSchema = z.object({
  menteeId: z.string(),
  mentorId: z.string(),
})

export const assignMentorToAssessmentSchema = z.object({
  assessmentId: z.string(),
  mentorId: z.string(),
})
