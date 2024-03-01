import { Session } from 'next-auth'

import { auth } from '@/lib/auth'

interface SessionLoaderProps {
	children: ({}: Session) => React.ReactNode
}

async function SessionLoader({ children }: SessionLoaderProps) {
	const session = await auth()

	if (!session) return

	return <>{children(session)}</>
}

export { SessionLoader }
