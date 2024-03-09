import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

async function ProtectedPage({ children }: PropsWithChildren) {
  const session = await auth()
  if (!session) redirect('/login')

  return <>{children}</>
}

export { ProtectedPage }
