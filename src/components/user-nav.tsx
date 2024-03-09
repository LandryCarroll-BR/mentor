import * as React from 'react'
import type { Session } from 'next-auth'
import { ChevronDownIcon } from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import { Box } from '@/components/layout'
import { SignOutButton } from '@/components/sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu'

const UserNav: React.FC<{ session?: Session }> = ({ session }) => {
  if (!session) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='gap-2 px-1 pr-2'>
          <Avatar className='h-7 w-7'>
            {session?.user?.image && <AvatarImage src={session.user.image} />}
            {session?.user?.name && <AvatarFallback>{session.user.name[0]}</AvatarFallback>}
          </Avatar>
          <Box>{session.user?.name}</Box>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48' align='end'>
        <SignOutButton className='w-full justify-start' variant='ghost' size='sm'>
          Log Out
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserNav }
