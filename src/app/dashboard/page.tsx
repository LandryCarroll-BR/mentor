import Link from 'next/link'
import { Suspense } from 'react'

import { Badge } from '@/ui/badge'
import { Main } from '@/components/main'
import { Button } from '@/components/ui/button'
import { GlobeIcon, PlusIcon } from '@radix-ui/react-icons'
import { ProtectedPage } from '@/root/src/components/protected-page'
import { Heading, Paragraph } from '@/components/typography'
import { SessionLoader } from '@/data/loaders/session-loader'
import { Box, Container, Grid } from '@/components/layout'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { CreateOrganizationForm } from '@/root/src/components/forms/create-organization-form'
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTrigger } from '@/components/responsive-dialog'

export default async function Dashboard() {
  return (
    <ProtectedPage>
      <Main className='w-full flex-row gap-4 p-4 pt-2'>
        <Suspense>
          <SessionLoader>
            {({ user }) => (
              <UserOrganizationLoader.List userId={user?.id}>
                {({ userOrgs }) => (
                  <Container>
                    <Heading as='h1'>Organizations</Heading>
                    <Paragraph className='prose mt-2'>Click into one of your organizations</Paragraph>
                    <Grid className='grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                      {userOrgs.map((userOrg) => (
                        <Link key={userOrg.organization.id} href={`/dashboard/${userOrg.organization.id}`} className='group'>
                          <Card className='transition-colors group-hover:bg-muted'>
                            <CardHeader>
                              <CardTitle className='flex flex-wrap gap-2'>
                                <GlobeIcon className='text-muted-foreground' />
                                {userOrg.organization.name}
                                <Badge variant={'secondary'} className='ml-auto capitalize'>
                                  {userOrg.role.toLocaleLowerCase()}
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                      <ResponsiveDialog>
                        <ResponsiveDialogTrigger asChild>
                          <Button
                            variant={'outline'}
                            className='h-full gap-2 rounded-xl border-2 border-dashed pr-2 text-muted-foreground shadow-none'
                          >
                            Create a New Organization
                            <PlusIcon />
                          </Button>
                        </ResponsiveDialogTrigger>
                        <ResponsiveDialogContent>
                          <Box className='mx-auto w-full max-w-sm px-4 md:max-w-xl md:p-0'>
                            <CreateOrganizationForm userId={user.id} />
                          </Box>
                        </ResponsiveDialogContent>
                      </ResponsiveDialog>
                    </Grid>
                  </Container>
                )}
              </UserOrganizationLoader.List>
            )}
          </SessionLoader>
        </Suspense>
      </Main>
    </ProtectedPage>
  )
}
