'use client'

import { ColumnDef } from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { LoaderData } from '@/lib/utils'
import { Flex } from '@/components/layout'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { fetchMenteesByOrganization } from '@/data/queries/mentee'
import { MenteeData } from '@/components/mentors-table/mentee-data'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'

export type Mentor = {
  mentorId: string
  organizationId: string
  mentorName: string
  assignedMentors: {
    mentee: {
      name: string | null
    }
    mentor: {
      name: string | null
    }
  }[]
  email: string
  status: 'Pending' | 'Complete'
  referrerEmail: string
  mentees: LoaderData<typeof fetchMenteesByOrganization>
}

export const mentorColumns: ColumnDef<Mentor>[] = [
  {
    accessorKey: 'mentorName',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Mentor Email',
  },
  {
    accessorKey: 'referrerEmail',
    header: 'Reference Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'assignedMentees',
    header: 'Assigned Mentees',
    cell: ({ row }) => {
      return (
        <Flex className='gap-2'>
          {row.original.assignedMentors.map((assignedMentor) => (
            <Badge key={assignedMentor.mentee.name} variant={'secondary'}>
              {assignedMentor.mentee.name}
            </Badge>
          ))}
        </Flex>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      return (
        <Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <DotsHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SheetTrigger className='w-full justify-start text-start'>Assign to Mentee</SheetTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>Resend Reference Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SheetContent className='!w-3/4'>
            <SheetHeader>
              <SheetTitle>Select a Mentee</SheetTitle>
              <SheetDescription>Assign {row.original.mentorName} to a mentee.</SheetDescription>
            </SheetHeader>
            <MenteeData organizationId={row.original.organizationId} mentorId={row.original.mentorId} />
          </SheetContent>
        </Sheet>
      )
    },
  },
]
