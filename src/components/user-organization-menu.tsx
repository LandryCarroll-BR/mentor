import { GlobeIcon } from '@radix-ui/react-icons'

import { Box } from '@/components/layout'
import { SessionLoader } from '@/data/loaders/session-loader'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

function UserOrganizationMenu({ organizationId }: { organizationId: string }) {
  return (
    <Box className='mb-4 h-fit border-b pb-2'>
      <SessionLoader>
        {({ user }) => (
          <Box className='pb-2'>
            <Select>
              <UserOrganizationLoader userId={user.id} organizationId={organizationId} fallback={<>testing</>}>
                {({ userOrg }) => (
                  <SelectTrigger className='w-full pl-0'>
                    <Box className='mr-2 rounded-md bg-muted p-2'>
                      <GlobeIcon className='h-5 w-5 text-primary' />
                    </Box>
                    <SelectValue placeholder={userOrg?.organization.name} defaultValue={organizationId} />
                  </SelectTrigger>
                )}
              </UserOrganizationLoader>
              <SelectContent>
                <UserOrganizationLoader.List userId={user.id}>
                  {({ userOrgs }) => (
                    <>
                      {userOrgs?.map((userOrg) => (
                        <SelectItem key={userOrg.organization.id} value={userOrg.organization.id}>
                          {userOrg.organization.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </UserOrganizationLoader.List>
              </SelectContent>
            </Select>
          </Box>
        )}
      </SessionLoader>
    </Box>
  )
}

export { UserOrganizationMenu }
