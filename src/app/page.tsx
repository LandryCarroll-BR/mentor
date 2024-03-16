import Link from 'next/link'
import { Suspense } from 'react'

import { Main } from '@/components/main'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Box, Flex } from '@/components/layout'
import { SessionLoader } from '@/data/loaders/session-loader'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'

export default async function Home() {
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
            <SessionLoader
              fallback={
                <Button asChild variant={'outline'}>
                  <Link href={'/login'}>Log In</Link>
                </Button>
              }
            >
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
      <Main className='h-dvh w-full flex-row'>
        <PageHeader>
          <PageHeaderHeading>Welcome to Mentor!</PageHeaderHeading>
          <PageHeaderDescription>
            A place where mentors can connect with others. This project is currently under development.
          </PageHeaderDescription>
          <PageActions>
            <Button asChild>
              <Link href={'/login'}>Sign Up</Link>
            </Button>
          </PageActions>
        </PageHeader>
      </Main>
    </>
  )
}
