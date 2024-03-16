import { unstable_cache as cache } from 'next/cache'

import { LoaderData } from '@/lib/utils'
import { fetchAllUserOrganizations, fetchUserOrganization } from '@/root/src/data/queries/user-organization'

interface UserOrganizationLoaderProps {
  children: ({ userOrg }: { userOrg: LoaderData<typeof fetchUserOrganization> }) => React.ReactNode
  userId?: string
  organizationId?: string
  fallback?: React.ReactNode
}

async function UserOrganizationLoader({ children, fallback, organizationId, userId }: UserOrganizationLoaderProps) {
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
  children: ({ userOrgs }: { userOrgs: LoaderData<typeof fetchAllUserOrganizations> }) => React.ReactNode
  userId?: string
  fallback?: React.ReactNode
}

async function UserOrganizationList({ children, fallback, userId }: UserOrganizationListProps) {
  if (!userId) return

  const cachedUserOrgs = cache(async () => fetchAllUserOrganizations({ userId }), [`user-organizations-${userId}`], {
    tags: [`user-organization`],
  })

  const { data: userOrgs } = await cachedUserOrgs()

  if (!userOrgs) return <>{fallback}</>

  return <>{children({ userOrgs })}</>
}

UserOrganizationLoader.List = UserOrganizationList

export { UserOrganizationLoader }
