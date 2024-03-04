import { Main } from '@/components/main'
import { Box, Flex } from '../components/layout'
import { Icons } from '../components/icons'
import { SessionLoader } from '../components/session-loader'
import { UserNav } from '../components/user-nav'
import { SignInButton } from '../components/sign-in-button'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '../components/page-header'

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
          <SessionLoader fallback={<SignInButton variant={'outline'}>Log In</SignInButton>}>
            {() => (
              <Button asChild size={'sm'} variant={'outline'}>
                <Link href={'/dashboard'}>Dashboard</Link>
              </Button>
            )}
          </SessionLoader>
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
