'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'

import { Button } from '@/ui/button'
import { SheetClose } from '@/ui/sheet'
import { LoaderData } from '@/lib/utils'
import { Flex } from '@/components/layout'
import { Card, CardHeader, CardTitle } from '@/ui/card'
import { assignMentorToMentee } from '@/data/actions/mentor'
import { fetchMenteesByOrganization } from '@/data/queries/mentee'

function MenteeData({ organizationId, mentorId }: { organizationId: string; mentorId: string }) {
  const { data } = useQuery({
    queryKey: ['mentee-data'],
    queryFn: () => axios.get<LoaderData<typeof fetchMenteesByOrganization>>(`/api/mentee?organizationId=${organizationId}`),
  })

  const { execute } = useAction(assignMentorToMentee)

  if (!data) return

  const { data: mentees } = data

  if (!mentees) return

  return (
    <Flex className='flex-col gap-4 py-8'>
      {mentees?.map((mentee) => (
        <Card key={mentee.user.id}>
          <CardHeader>
            <CardTitle className='flex w-full items-center capitalize'>
              {mentee.user.name}
              <Button asChild>
                <SheetClose
                  className='ml-auto'
                  onClick={() => {
                    execute({ menteeId: mentee.user.id, mentorId })
                  }}
                >
                  Assign
                </SheetClose>
              </Button>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </Flex>
  )
}

export { MenteeData }
