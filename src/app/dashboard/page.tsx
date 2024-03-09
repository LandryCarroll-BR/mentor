import Link from 'next/link'
import { Suspense } from 'react'

import { Main } from '@/components/main'
import { Icons } from '@/components/icons'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { GlobeIcon, PlusIcon } from '@radix-ui/react-icons'
import { ProtectedPage } from '@/components/protected-page'
import { Heading, Paragraph } from '@/components/typography'
import { SessionLoader } from '@/data/loaders/session-loader'
import { Box, Container, Flex, Grid } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserOrganizationLoader } from '@/data/loaders/user-organization'
import { CreateOrganizationForm } from '@/components/forms/new-organization-form'
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTrigger } from '../../components/responsive-dialog'

export default async function Dashboard() {
  return (
    <ProtectedPage>
      <SessionLoader>
        {({ session, user }) => (
          <>
            <Flex className='w-full px-4 pb-0 pt-2'>
              <Link href={'/'}>
                <Flex className='h-fit w-full items-center gap-2 p-2 text-xl font-bold'>
                  <Icons.logo className='h-5 w-5' />
                  <Box>Mentor</Box>
                </Flex>
              </Link>
              <Flex className='ml-auto items-center'>
                <UserNav session={session} />
              </Flex>
            </Flex>
            <Main className='w-full flex-row gap-4 p-4 pt-2'>
              <Suspense>
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
                                <CardTitle className='flex gap-2'>
                                  <GlobeIcon className='text-muted-foreground' />
                                  {userOrg.organization.name}
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
              </Suspense>
            </Main>
          </>
        )}
      </SessionLoader>
    </ProtectedPage>
  )
}
