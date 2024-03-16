import { Main } from '@/components/main'
import { Box, Container } from '@/components/layout'
import { SignInButton } from '@/components/sign-in-button'
import { SessionLoader } from '@/data/loaders/session-loader'
import { CreateMentorForm } from '@/components/forms/create-mentor-form'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'

export default async function Home({ params }: { params: { organizationId: string } }) {
  return (
    <Main className='h-dvh w-full flex-col'>
      <PageHeader>
        <SessionLoader fallback={<SignInButton variant={'outline'}>Log In</SignInButton>}>
          {({ user }) => (
            <UserOrganizationLoader userId={user.id} organizationId={params.organizationId}>
              {({ userOrg }) => <PageHeaderHeading>Register at {userOrg.organization.name}</PageHeaderHeading>}
            </UserOrganizationLoader>
          )}
        </SessionLoader>
        <PageHeaderDescription>Fill out the form below to join as a mentor.</PageHeaderDescription>
      </PageHeader>
      <Container className='max-w-md'>
        <Box className='rounded-lg border p-4 shadow-lg'>
          <CreateMentorForm organizationId={params.organizationId} />
        </Box>
      </Container>
    </Main>
  )
}
