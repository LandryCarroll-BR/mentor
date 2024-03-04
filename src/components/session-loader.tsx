import { Session } from 'next-auth'

import { auth } from '@/lib/auth'

interface SessionLoaderProps {
  children: ({}: Session) => React.ReactNode
  fallback?: React.ReactNode
}

async function SessionLoader({ children, fallback }: SessionLoaderProps) {
  const session = await auth()

  if (!session) return <>{fallback}</>

  return <>{children(session)}</>
}

export { SessionLoader }
