import { Main } from '@/components/main'
import { Container, Section } from '@/components/layout'
import { SignInButton } from '@/components/sign-in-button'
import { SignOutButton } from '@/components/sign-out-button'
import { auth } from '@/lib/auth'
import { SessionLoader } from '../components/session-loader'

export default async function Home() {
	const session = await auth()

	return (
		<Main className="h-screen justify-center items-center gap-2">
			<Section>
				<Container className="justify-center items-center flex gap-2">
					<SignInButton provider="google">SignIn</SignInButton>
					<SignOutButton>SignOut</SignOutButton>
				</Container>
			</Section>
			<Section>
				<Container className="flex justify-center items-center">
					<SessionLoader>{({ user }) => user?.name}</SessionLoader>
				</Container>
			</Section>
		</Main>
	)
}
