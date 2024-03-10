import Link from 'next/link'
import { Suspense } from 'react'

import { Main } from '@/components/main'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Box, Container, Flex } from '@/components/layout'
import { SignInButton } from '@/components/sign-in-button'
import { SessionLoader } from '@/data/loaders/session-loader'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { MentorRegistrationForm } from '@/root/src/components/forms/mentor-registration-form'

export default async function Home({ params }: { params: { organizationId: string } }) {
  return (
    <>
      <Flex className='w-full px-4 pb-0 pt-2'>
        <Link href={'/'}>
          <Flex className='h-fit w-full items-center gap-2 p-2 text-xl font-bold'>
            <Icons.logo className='h-5 w-5' />
            <Box>Mentor</Box>
          </Flex>
        </Link>
        <Flex className='ml-auto items-center'>
          <Suspense>
            <SessionLoader fallback={<SignInButton variant={'outline'}>Log In</SignInButton>}>
              {({ user }) => (
                <UserOrganizationLoader.List userId={user.id}>
                  {({ userOrgs }) => (
                    <Button asChild size={'sm'} variant={'outline'}>
                      <Link href={`/dashboard/${userOrgs[0].organization.id}`}>Dashboard</Link>
                    </Button>
                  )}
                </UserOrganizationLoader.List>
              )}
            </SessionLoader>
          </Suspense>
        </Flex>
      </Flex>
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
          <PageActions>
            <Button asChild>
              <Link href={'/login'}>Sign Up</Link>
            </Button>
          </PageActions>
        </PageHeader>
        <Container className='max-w-md'>
          <Box className='rounded-lg border p-4 shadow-lg'>
            <MentorRegistrationForm organizationId={params.organizationId} />
          </Box>
        </Container>
      </Main>
    </>
  )
}
