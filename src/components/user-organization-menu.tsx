import { ArrowLeftIcon, GlobeIcon } from '@radix-ui/react-icons'

import { Box } from '@/components/layout'
import { SessionLoader } from '@/data/loaders/session-loader'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Button } from './ui/button'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

function UserOrganizationMenu({ organizationId }: { organizationId: string }) {
  return (
    <Box className='mb-4 h-fit border-b pb-2'>
      <SessionLoader>
        {({ user }) => (
          <Box className='pb-2'>
            <DropdownMenu>
              <UserOrganizationLoader userId={user.id} organizationId={organizationId} fallback={<>testing</>}>
                {({ userOrg }) => (
                  <DropdownMenuTrigger className='w-full pl-0' asChild>
                    <Button variant={'outline'} className='justify-start gap-2 pl-0'>
                      <Box className='border-r p-2'>
                        <GlobeIcon className='text-primary' />
                      </Box>
                      {userOrg?.organization.name}
                    </Button>
                  </DropdownMenuTrigger>
                )}
              </UserOrganizationLoader>
              <DropdownMenuContent className='w-[200px]'>
                <UserOrganizationLoader.List userId={user.id}>
                  {({ userOrgs }) => (
                    <>
                      {userOrgs?.map((userOrg) => (
                        <DropdownMenuItem key={userOrg.organization.id} asChild>
                          <Link href={`/dashboard/${userOrg.organization.id}`}>{userOrg.organization.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </UserOrganizationLoader.List>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/`} className='justify-center gap-2'>
                    <ArrowLeftIcon />
                    All Organizations
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Box>
        )}
      </SessionLoader>
    </Box>
  )
}

export { UserOrganizationMenu }
