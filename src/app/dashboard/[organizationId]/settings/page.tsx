import { Main } from '@/components/main'
import { Box, Flex } from '@/components/layout'
import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { Heading, Paragraph } from '@/components/typography'
import { UserOrganizationMenu } from '@/components/user-organization-menu'
import { UpdateOrganizationForm } from '@/root/src/components/forms/update-organization-form'
import { UserOrganizationLoader } from '@/root/src/data/loaders/user-organization'
import { SessionLoader } from '@/root/src/data/loaders/session-loader'

export default async function Dashboard({ params }: { params: { organizationId: string } }) {
  return (
    <Main className='w-full flex-row gap-4 p-4 pt-2'>
      <aside className='sticky top-4 flex h-fit flex-col  md:w-full md:max-w-[200px]'>
        <UserOrganizationMenu organizationId={params.organizationId} />
        <SidebarNav organizationId={params.organizationId} />
      </aside>
      <article className='flex flex-1 flex-col'>
        <Flex className='w-full flex-1 flex-col gap-3 rounded-lg bg-muted p-0'>
          <Flex className='w-full p-4 pb-0'>
            <Box className='text-3xl font-semibold'>Settings</Box>
          </Flex>
          <Flex className='flex-1 flex-col p-4 pt-0.5'>
            <Box className='w-full flex-1 rounded-md border bg-white'>
              <Flex className='flex-col gap-2 p-8'>
                <Heading as='h2' className='text-lg font-medium'>
                  Organization
                </Heading>
                <Paragraph className='text-muted-foreground'>Adjust organizational settings</Paragraph>
                <Separator />
                <Box className='pt-4'>
                  <SessionLoader>
                    {({ user }) => (
                      <UserOrganizationLoader userId={user.id} organizationId={params.organizationId}>
                        {({ userOrg }) => <UpdateOrganizationForm organization={userOrg} userId={user.id} />}
                      </UserOrganizationLoader>
                    )}
                  </SessionLoader>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </article>
    </Main>
  )
}
