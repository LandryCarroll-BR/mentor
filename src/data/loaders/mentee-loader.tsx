import { unstable_cache as cache } from 'next/cache'

import { LoaderData } from '@/lib/utils'
import { fetchUserOrganization } from '@/root/src/data/queries/user-organization'
import { fetchMenteesByOrganization } from '../queries/mentee'

interface UserOrganizationLoaderProps {
  children: ({ userOrg }: { userOrg: LoaderData<typeof fetchUserOrganization> }) => React.ReactNode
  userId?: string
  organizationId?: string
  fallback?: React.ReactNode
}

async function MenteeLoader({ children, fallback, organizationId, userId }: UserOrganizationLoaderProps) {
  if (!userId || !organizationId) return

  const cachedUserOrgs = cache(
    async () => fetchUserOrganization({ userId, organizationId }),
    [`user-organization${organizationId + userId}`],
    {
      tags: [`user-organization`],
    }
  )

  const { data: userOrg } = await cachedUserOrgs()

  if (!userOrg) return <>{fallback}</>

  return <>{children({ userOrg })}</>
}

interface MenteesListProps {
  children: ({ mentees }: { mentees: LoaderData<typeof fetchMenteesByOrganization> }) => React.ReactNode
  organizationId?: string
  fallback?: React.ReactNode
}

async function MenteeList({ children, fallback, organizationId }: MenteesListProps) {
  if (!organizationId) return

  const cachesMentees = cache(async () => fetchMenteesByOrganization({ organizationId }), [`user-mentees${organizationId}`], {
    tags: [`user-mentees`],
  })

  const { data: mentees } = await cachesMentees()

  if (!mentees) return <>{fallback}</>

  return <>{children({ mentees })}</>
}

MenteeLoader.List = MenteeList

export { MenteeLoader }
