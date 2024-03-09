import { DashboardIcon, GearIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons'

import { Box } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ActiveLink } from '@/root/src/components/active-link'

export default async function AdminSidebarNav({ organizationId }: { organizationId: string }) {
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

      <Button asChild className='mt-auto justify-start gap-2 px-2' variant={'ghost'}>
        <ActiveLink href={`/dashboard/${organizationId}/settings`} activeClassName='bg-secondary'>
          <GearIcon className='h-5 w-5' />
          <Box className='text-md hidden md:block'>Settings</Box>
        </ActiveLink>
      </Button>
    </nav>
  )
}
