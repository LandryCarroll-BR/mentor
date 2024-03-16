import { unstable_cache as cache } from 'next/cache'

import { LoaderData } from '@/lib/utils'
import { fetchUserOrganization } from '@/root/src/data/queries/user-organization'
import { fetchMentorsByOrganization } from '../queries/mentor'

interface UserOrganizationLoaderProps {
  children: ({ userOrg }: { userOrg: LoaderData<typeof fetchUserOrganization> }) => React.ReactNode
  userId?: string
  organizationId?: string
  fallback?: React.ReactNode
}

async function MentorLoader({ children, fallback, organizationId, userId }: UserOrganizationLoaderProps) {
  if (!userId || !organizationId) return

  const cachedUserOrgs = cache(
    async () => fetchUserOrganization({ userId, organizationId }),
    [`user-organization-${organizationId + userId}`],
    {
      tags: [`user-organization`],
    }
  )

  const { data: userOrg } = await cachedUserOrgs()

  if (!userOrg) return <>{fallback}</>

  return <>{children({ userOrg })}</>
}

interface UserOrganizationListProps {
  children: ({ mentors }: { mentors: LoaderData<typeof fetchMentorsByOrganization> }) => React.ReactNode
  organizationId?: string
  fallback?: React.ReactNode
}

async function MentorList({ children, fallback, organizationId }: UserOrganizationListProps) {
  if (!organizationId) return

  const cachesMentors = cache(async () => fetchMentorsByOrganization({ organizationId }), [`user-mentors-${organizationId}`], {
    tags: [`user-mentors`],
  })

  const { data: mentors } = await cachesMentors()

  if (!mentors) return <>{fallback}</>

  return <>{children({ mentors })}</>
}

MentorLoader.List = MentorList

export { MentorLoader }
