import { Session } from 'next-auth'

import { auth } from '@/lib/auth'
import { User } from '@prisma/client'
import { fetchUser } from '@/data/queries/user'
import { unstable_cache as cache } from 'next/cache'

interface SessionLoaderProps {
  children: ({ user, session }: { user: User; session: Session }) => React.ReactNode
  fallback?: React.ReactNode
}

async function SessionLoader({ children, fallback }: SessionLoaderProps) {
  const session = await auth()

  if (!session) return <>{fallback}</>

  const cachedUser = cache(() => fetchUser({ email: session?.user?.email ?? '' }), [`user-${session.user?.email}`], { tags: ['user'] })

  const { data: user } = await cachedUser()

  if (!user) return

  return <>{children({ user, session })}</>
}

export { SessionLoader }
