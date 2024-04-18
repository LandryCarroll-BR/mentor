import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import { Main } from '@/components/main'
import { Box, Flex, Grid } from '@/components/layout'
import { SidebarNav } from '@/root/src/components/sidebar-nav'
import { ProtectedPage } from '@/root/src/components/protected-page'
import { UserOrganizationMenu } from '@/components/user-organization-menu'
import { AssessmentLoader } from '@/root/src/data/loaders/assessment-loader'
import { Card, CardDescription, CardHeader, CardTitle } from '@/root/src/components/ui/card'
import { Loader } from '@/root/src/components/loader'
import { fetchAssessmentsByOrganizationId } from '@/root/src/data/queries/assessment'
import { Suspense } from 'react'
import { SessionLoader } from '@/root/src/data/loaders/session-loader'
import { UserOrganizationLoader } from '@/root/src/data/loaders/user-organization'

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
              <Box className='text-3xl font-semibold'>Assessments</Box>
              <Box className='ml-auto'>
                <Button className='gap-2 pl-2' size={'sm'} asChild>
                  <Link href={'assessments/create'}>
                    <PlusIcon />
                    Create Assessment
                  </Link>
                </Button>
              </Box>
            </Flex>
            <Flex className='flex-1 flex-col p-4 pt-0.5'>
              <Box className='w-full flex-1 rounded-md border bg-white p-4'>
                <Suspense>
                  <SessionLoader>
                    {({ user }) => (
                      <UserOrganizationLoader organizationId={params.organizationId} userId={user.id}>
                        {({ userOrg }) => (
                          <AssessmentLoader.List organizationId={params.organizationId} role={userOrg.role} userId={user.id}>
                            {({ assessments }) => (
                              <Grid className='grid-cols-4 gap-4'>
                                {assessments?.map((assessment) => (
                                  <Link key={assessment.id} href={'#'} className='group'>
                                    <Card className='group-hover:shadow-lg'>
                                      <CardHeader>
                                        <CardTitle>{assessment.title}</CardTitle>
                                        <CardDescription>{assessment.description}</CardDescription>
                                      </CardHeader>
                                    </Card>
                                  </Link>
                                ))}
                              </Grid>
                            )}
                          </AssessmentLoader.List>
                        )}
                      </UserOrganizationLoader>
                    )}
                  </SessionLoader>
                </Suspense>
              </Box>
            </Flex>
          </Flex>
        </article>
      </Main>
    </ProtectedPage>
  )
}
