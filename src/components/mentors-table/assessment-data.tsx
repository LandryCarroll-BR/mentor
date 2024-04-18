'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'

import { Button } from '@/ui/button'
import { SheetClose } from '@/ui/sheet'
import { LoaderData } from '@/lib/utils'
import { Flex } from '@/components/layout'
import { Card, CardHeader, CardTitle } from '@/ui/card'
import { fetchAssessmentsByOrganizationId } from '../../data/queries/assessment'
import { assignMentorToAssessment } from '../../data/actions/mentor'

function AssessmentData({ organizationId, mentorId }: { organizationId: string; mentorId: string }) {
  const { data, status } = useQuery({
    queryKey: ['assessment-data'],
    queryFn: () => axios.get<LoaderData<typeof fetchAssessmentsByOrganizationId>>(`/api/assessment?organizationId=${organizationId}`),
  })

  console.log(data, status)

  const { execute } = useAction(assignMentorToAssessment)

  if (!data) return

  const { data: assessments } = data

  if (!assessments) return

  return (
    <Flex className='flex-col gap-4 py-8'>
      {assessments?.map((assessment) => (
        <Card key={assessment.id}>
          <CardHeader>
            <CardTitle className='flex w-full items-center capitalize'>
              {assessment.title}
              <Button asChild>
                <SheetClose
                  className='ml-auto'
                  onClick={() => {
                    execute({ mentorId, assessmentId: assessment.id })
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

export { AssessmentData }
