import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { UserOrganizationLoader } from '../data/loaders/user-organization'
import { Role } from '@prisma/client'
import { SessionLoader } from '../data/loaders/session-loader'

interface ProtectedPageProps {
  children: React.ReactNode
  organizationId?: string
  allowedRoles?: Role[]
}

async function ProtectedPage({ allowedRoles, children, organizationId }: ProtectedPageProps) {
  const session = await auth()
  if (!session) redirect('/login')
  if (!organizationId || !allowedRoles) return <>{children}</>

  function isAllowed(role: Role) {
    return allowedRoles?.includes(role)
  }

  return (
    <SessionLoader>
      {({ user }) => (
        <UserOrganizationLoader organizationId={organizationId} userId={user.id}>
          {({ userOrg }) => {
            if (!isAllowed(userOrg.role)) return <>Not ALLOWED</>
            if (userOrg.role) return <>{children}</>
          }}
        </UserOrganizationLoader>
      )}
    </SessionLoader>
  )
}

export { ProtectedPage }
