import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Box, Flex } from '@/components/layout'
import { UserNav } from '@/components/user-nav'
import { SessionLoader } from '@/data/loaders/session-loader'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
          <SessionLoader>{({ session }) => <UserNav session={session} />}</SessionLoader>
        </Flex>
      </Flex>
      {children}
    </>
  )
}
