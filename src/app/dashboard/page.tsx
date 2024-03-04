import Link from 'next/link'
import {
  CaretSortIcon,
  ChatBubbleIcon,
  DashboardIcon,
  GearIcon,
  GlobeIcon,
  Link1Icon,
  Link2Icon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

import { Main } from '@/components/main'
import { Box, Container, Flex } from '@/components/layout'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { SessionLoader } from '../../components/session-loader'
import { ProtectedPage } from '../../components/protected-page'
import { Icons } from '../../components/icons'

export default async function Dashboard() {
  return (
    <ProtectedPage>
      <Flex className='w-full px-4 pb-0 pt-2'>
        <Flex className='h-fit w-full items-center gap-2 p-2 text-xl font-bold'>
          <Icons.logo className='h-5 w-5' />
          <Box>Mentor</Box>
        </Flex>
        <Flex className='ml-auto items-center'>
          <SessionLoader>{(session) => <UserNav session={session} />}</SessionLoader>
        </Flex>
      </Flex>
      <Main className='w-full flex-row gap-4 p-4 pt-2'>
        <aside className='sticky top-4 flex h-fit flex-col  md:w-full md:max-w-[200px]'>
          <Box className='mb-4 h-fit border-b pb-2'>
            <Button className='w-full justify-start gap-3 px-0' variant={'ghost'}>
              <Box className='rounded-md bg-muted p-2'>
                <GlobeIcon className='h-5 w-5 text-primary' />
              </Box>
              <Box className='hidden md:block'>My Organization</Box>
              <CaretSortIcon className='hidden md:block' />
            </Button>
          </Box>
          <nav className='flex flex-col gap-2 '>
            <Button asChild className='justify-start gap-2 px-2' variant={'secondary'}>
              <Link href={'/'}>
                <DashboardIcon className='h-5 w-5' />
                <Box className='text-md hidden md:block'>Dashboard</Box>
              </Link>
            </Button>
            <Button asChild className='justify-start gap-2 px-2' variant={'ghost'}>
              <Link href={'/'}>
                <PersonIcon className='h-5 w-5' />
                <Box className='text-md hidden md:block'>Mentors</Box>
              </Link>
            </Button>
            <Button asChild className='justify-start gap-2 px-2' variant={'ghost'}>
              <Link href={'/'}>
                <RocketIcon className='h-5 w-5' />
                <Box className='text-md hidden md:block'>Assessments</Box>
              </Link>
            </Button>
            <Button asChild className='justify-start gap-2 px-2' variant={'ghost'}>
              <Link href={'/'}>
                <ChatBubbleIcon className='h-5 w-5' />
                <Box className='text-md hidden md:block'>Messages</Box>
              </Link>
            </Button>
            <Button asChild className='fixed bottom-4 mt-auto justify-start gap-2 px-2' variant={'ghost'}>
              <Link href={'/'}>
                <GearIcon className='h-5 w-5' />
                <Box className='text-md hidden md:block'>Settings</Box>
              </Link>
            </Button>
          </nav>
        </aside>
        <article className='flex flex-1 flex-col'>
          <Flex className='w-full flex-1 flex-col gap-4 rounded-lg bg-muted p-0'>
            <Flex className='w-full p-4 pb-0'>
              <Box className='text-3xl font-semibold'>Dashboard</Box>
              <Box className='ml-auto'>
                <Button className='gap-2 pl-3'>
                  <Link2Icon className='h-4 w-4' />
                  <Box> Share Link </Box>
                </Button>
              </Box>
            </Flex>
            <Flex className='flex-1 flex-col p-4 pt-0'>
              <Box className='w-full flex-1 rounded-md border bg-white'>
                <div className=''></div>
              </Box>
            </Flex>
          </Flex>
        </article>
      </Main>
    </ProtectedPage>
  )
}
