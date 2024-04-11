import { unstable_cache as cache } from 'next/cache'

import { LoaderData } from '@/lib/utils'
import { fetchAssessmentsByOrganizationId } from '@/root/src/data/queries/assessment'

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
}

async function AssessmentList({ children, fallback, organizationId }: AssessmentsListProps) {
  if (!organizationId) return

  const cachesAssessments = cache(async () => fetchAssessmentsByOrganizationId({ organizationId }), [`assessments${organizationId}`], {
    tags: ['assessments'],
  })

  const { data: assessments } = await cachesAssessments()

  if (!assessments) return <>{fallback}</>

  return <>{children({ assessments })}</>
}

AssessmentLoader.List = AssessmentList

export { AssessmentLoader }
