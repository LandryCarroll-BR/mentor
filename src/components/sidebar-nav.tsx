import { DashboardIcon, GearIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons'

import { Box } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ActiveLink } from '@/root/src/components/active-link'
import { SessionLoader } from '../data/loaders/session-loader'
import { UserOrganizationLoader } from '../data/loaders/user-organization'

async function AdminSidebarNav({ organizationId }: { organizationId: string }) {
  const adminSidebarNavLinks = [
    { label: 'Dashboard', href: `/dashboard/${organizationId}`, Icon: DashboardIcon },
    { label: 'Mentors', href: `/dashboard/${organizationId}/mentors`, Icon: PersonIcon },
    { label: 'Mentees', href: `/dashboard/${organizationId}/mentees`, Icon: PersonIcon },
    { label: 'Assessments', href: `/dashboard/${organizationId}/assessments`, Icon: RocketIcon },
  ]

  return (
    <nav className='flex flex-col gap-2'>
      {adminSidebarNavLinks.map(({ href, label, Icon }) => (
        <Button asChild key={label} className='justify-start gap-2 px-2' variant={'ghost'}>
          <ActiveLink href={href} activeClassName='bg-secondary'>
            <Icon className='h-5 w-5' />
            <Box className='text-md hidden md:block'>{label}</Box>
          </ActiveLink>
        </Button>
      ))}

      <Button asChild className='fixed bottom-4 w-fit justify-start gap-2 px-2 md:w-[200px]' variant={'ghost'}>
        <ActiveLink href={`/dashboard/${organizationId}/settings`} activeClassName='bg-secondary'>
          <GearIcon className='h-5 w-5' />
          <Box className='text-md hidden md:block'>Settings</Box>
        </ActiveLink>
      </Button>
    </nav>
  )
}

interface SidebarNavProps {
  organizationId: string
}

function SidebarNav({ organizationId }: SidebarNavProps) {
  const adminSidebarNavLinks = [
    { label: 'Dashboard', href: `/dashboard/${organizationId}`, Icon: DashboardIcon },
    { label: 'Mentors', href: `/dashboard/${organizationId}/mentors`, Icon: PersonIcon },
    { label: 'Mentees', href: `/dashboard/${organizationId}/mentees`, Icon: PersonIcon },
    { label: 'Assessments', href: `/dashboard/${organizationId}/assessments`, Icon: RocketIcon },
  ]

  const mentorSideBarNavLinks = [
    { label: 'Dashboard', href: `/dashboard/${organizationId}`, Icon: DashboardIcon },
    { label: 'Mentees', href: `/dashboard/${organizationId}/mentees`, Icon: PersonIcon },
    { label: 'Assessments', href: `/dashboard/${organizationId}/assessments`, Icon: RocketIcon },
  ]

  const sidebarLinks = {
    ADMIN: adminSidebarNavLinks,
    MENTOR: mentorSideBarNavLinks,
    MENTEE: mentorSideBarNavLinks,
  } as const

  return (
    <SessionLoader>
      {({ user }) => (
        <UserOrganizationLoader organizationId={organizationId} userId={user.id}>
          {({ userOrg: { role } }) => {
            return (
              <nav className='flex flex-col gap-2'>
                {sidebarLinks[role].map(({ href, label, Icon }) => (
                  <Button asChild key={label} className='justify-start gap-2 px-2' variant={'ghost'}>
                    <ActiveLink href={href} activeClassName='bg-secondary'>
                      <Icon className='h-5 w-5' />
                      <Box className='text-md hidden md:block'>{label}</Box>
                    </ActiveLink>
                  </Button>
                ))}
                {role === 'ADMIN' && (
                  <Button asChild className='fixed bottom-4 w-fit justify-start gap-2 px-2 md:w-[200px]' variant={'ghost'}>
                    <ActiveLink href={`/dashboard/${organizationId}/settings`} activeClassName='bg-secondary'>
                      <GearIcon className='h-5 w-5' />
                      <Box className='text-md hidden md:block'>Settings</Box>
                    </ActiveLink>
                  </Button>
                )}
              </nav>
            )
          }}
        </UserOrganizationLoader>
      )}
    </SessionLoader>
  )
}

export { SidebarNav }
