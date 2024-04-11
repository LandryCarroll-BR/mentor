import { PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import { Main } from '@/components/main'
import { Box, Flex } from '@/components/layout'
import { SidebarNav } from '@/root/src/components/sidebar-nav'
import { ProtectedPage } from '@/root/src/components/protected-page'
import { SessionLoader } from '@/root/src/data/loaders/session-loader'
import { UserOrganizationMenu } from '@/components/user-organization-menu'
import { CreateAssessmentForm } from '@/root/src/components/forms/create-assessment-form'

export default async function Dashboard({ params }: { params: { organizationId: string } }) {
  return (
    <ProtectedPage allowedRoles={['ADMIN', 'MENTOR']} organizationId={params.organizationId}>
      <SessionLoader>
        {({ user }) => (
          <Main className='w-full flex-row gap-4 p-4 pt-2'>
            <aside className='sticky top-4 flex h-fit flex-col  md:w-full md:max-w-[200px]'>
              <UserOrganizationMenu organizationId={params.organizationId} />
              <SidebarNav organizationId={params.organizationId} />
            </aside>
            <article className='flex flex-1 flex-col'>
              <Flex className='w-full flex-1 flex-col gap-3 rounded-lg bg-muted p-0'>
                <Flex className='w-full p-4 pb-0'>
                  <Box className='text-3xl font-semibold'>New Assessment</Box>
                  {/* <Box className='ml-auto'>
                    <Button className='gap-2 pl-2' size={'sm'}>
                      <PlusIcon />
                      Create Assessment
                    </Button>
                  </Box> */}
                </Flex>
                <Flex className='flex-1 flex-col p-4 pt-0.5'>
                  <Box className='w-full flex-1 rounded-md border bg-white'>
                    <div className='mx-auto max-w-3xl p-10'>
                      <CreateAssessmentForm organizationId={params.organizationId} userId={user.id} />
                    </div>
                  </Box>
                </Flex>
              </Flex>
            </article>
          </Main>
        )}
      </SessionLoader>
    </ProtectedPage>
  )
}
