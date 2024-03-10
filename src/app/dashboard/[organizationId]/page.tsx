import Link from 'next/link'

import { Main } from '@/components/main'
import { Icons } from '@/components/icons'
import { UserNav } from '@/components/user-nav'
import { Box, Flex } from '@/components/layout'
import { Link2Icon } from '@radix-ui/react-icons'
import { ProtectedPage } from '@/components/protected-page'
import { SessionLoader } from '@/data/loaders/session-loader'
import AdminSidebarNav from '@/components/admin-sidebar-nav'
import { UserOrganizationMenu } from '@/components/user-organization-menu'
import { CopyButton } from '@/root/src/components/copy-button'
import { env } from '@/root/src/lib/env'

export default async function Dashboard({ params }: { params: { organizationId: string } }) {
  return (
    <ProtectedPage>
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
      <Main className='w-full flex-row gap-4 p-4 pt-2'>
        <aside className='sticky top-4 flex h-fit flex-col  md:w-full md:max-w-[200px]'>
          <UserOrganizationMenu organizationId={params.organizationId} />
          <AdminSidebarNav organizationId={params.organizationId} />
        </aside>
        <article className='flex flex-1 flex-col'>
          <Flex className='w-full flex-1 flex-col gap-3 rounded-lg bg-muted p-0'>
            <Flex className='w-full p-4 pb-0'>
              <Box className='text-3xl font-semibold'>Dashboard</Box>
              <Box className='ml-auto'>
                <CopyButton className='gap-2 pl-3' size={'sm'} string={`${env.BASE_PATH}/dashboard/${params.organizationId}/register`}>
                  Copy Register Link
                </CopyButton>
              </Box>
            </Flex>
            <Flex className='flex-1 flex-col p-4 pt-0.5'>
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
