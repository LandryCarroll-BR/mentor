import { unstable_cache as cache } from 'next/cache'

import { LoaderData } from '@/lib/utils'
import { fetchAssessmentsByOrganizationId, fetchAssessmentsByUserId } from '@/root/src/data/queries/assessment'
import { Role } from '@prisma/client'

interface AssessmentLoaderProps {
  children: ({ userOrg }: { userOrg: LoaderData<typeof fetchAssessmentsByOrganizationId> }) => React.ReactNode
  userId?: string
  organizationId?: string
  fallback?: React.ReactNode
}

async function AssessmentLoader({ children, fallback, organizationId, userId }: AssessmentLoaderProps) {
  if (!userId || !organizationId) return

  const cachedAssessments = cache(
    async () => fetchAssessmentsByOrganizationId({ organizationId }),
    [`assessments${organizationId + userId}`],
    {
      tags: ['assessments'],
    }
  )

  const { data: userOrg } = await cachedAssessments()

  if (!userOrg) return <>{fallback}</>

  return <>{children({ userOrg })}</>
}

interface AssessmentsListProps {
  children: ({ assessments }: { assessments: LoaderData<typeof fetchAssessmentsByOrganizationId> }) => React.ReactNode
  organizationId?: string
  fallback?: React.ReactNode
  role?: Role
  userId?: string
}

async function AssessmentList({ children, fallback, organizationId, role, userId }: AssessmentsListProps) {
  if (!organizationId) return

  if (role === 'MENTOR') {
    if (!userId) return
    const cachedMentorAssessments = cache(async () => fetchAssessmentsByUserId({ userId }), [`assessments${organizationId}`], {
      tags: ['assessments'],
    })
    const { data: assessments } = await cachedMentorAssessments()
    if (!assessments) return <>{fallback}</>
    return <>{children({ assessments: assessments.map(({ assessment }) => assessment) })}</>
  }

  const cachedAllAssessments = cache(async () => fetchAssessmentsByOrganizationId({ organizationId }), [`assessments${organizationId}`], {
    tags: ['assessments'],
  })
  const { data: assessments } = await cachedAllAssessments()
  if (!assessments) return <>{fallback}</>
  return <>{children({ assessments })}</>
}

AssessmentLoader.List = AssessmentList

export { AssessmentLoader }
