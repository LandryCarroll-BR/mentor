import { PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import { Main } from '@/components/main'
import { Box, Flex } from '@/components/layout'
import { MenteeLoader } from '@/data/loaders/mentee-loader'
import { SidebarNav } from '@/root/src/components/sidebar-nav'
import { ProtectedPage } from '@/root/src/components/protected-page'
import { DataTable, menteeColumns } from '@/components/mentees-table'
import { CreateMenteeForm } from '@/components/forms/create-mentee-form'
import { UserOrganizationMenu } from '@/components/user-organization-menu'
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTrigger } from '@/components/responsive-dialog'

export default async function Dashboard({ params }: { params: { organizationId: string } }) {
  return (
    <ProtectedPage allowedRoles={['ADMIN', 'MENTOR']} organizationId={params.organizationId}>
      <Main className='w-full flex-row gap-4 p-4 pt-2'>
        <aside className='sticky top-4 flex h-fit flex-col  md:w-full md:max-w-[200px]'>
          <UserOrganizationMenu organizationId={params.organizationId} />
          <SidebarNav organizationId={params.organizationId} />
        </aside>
        <article className='flex flex-1 flex-col'>
          <Flex className='w-full flex-1 flex-col gap-3 rounded-lg bg-muted p-0'>
            <Flex className='w-full p-4 pb-0'>
              <Box className='text-3xl font-semibold'>Mentees</Box>
              <Box className='ml-auto'>
                <ResponsiveDialog>
                  <ResponsiveDialogTrigger asChild>
                    <Button className='gap-2 pl-2' size={'sm'}>
                      <PlusIcon />
                      Add Mentee
                    </Button>
                  </ResponsiveDialogTrigger>
                  <ResponsiveDialogContent>
                    <CreateMenteeForm organizationId={params.organizationId} />
                  </ResponsiveDialogContent>
                </ResponsiveDialog>
              </Box>
            </Flex>
            <Flex className='flex-1 flex-col p-4 pt-0.5'>
              <Box className='w-full flex-1 rounded-md border bg-white p-4'>
                <MenteeLoader.List organizationId={params.organizationId}>
                  {({ mentees }) => (
                    <DataTable
                      columns={menteeColumns}
                      data={mentees.map(({ user }) => ({
                        name: user.name,
                      }))}
                    />
                  )}
                </MenteeLoader.List>
              </Box>
            </Flex>
          </Flex>
        </article>
      </Main>
    </ProtectedPage>
  )
}
