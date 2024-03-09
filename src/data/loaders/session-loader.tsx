import { Session } from 'next-auth'

import { auth } from '@/lib/auth'
import { User } from '@prisma/client'
import { fetchUser } from '@/data/queries/user'

interface SessionLoaderProps {
  children: ({ user, session }: { user: User; session: Session }) => React.ReactNode
  fallback?: React.ReactNode
}

async function SessionLoader({ children, fallback }: SessionLoaderProps) {
  const session = await auth()

  if (!session) return <>{fallback}</>

  const { data: user } = await fetchUser({ email: session?.user?.email ?? '' })

  if (!user) return

  return <>{children({ user, session })}</>
}

export { SessionLoader }
