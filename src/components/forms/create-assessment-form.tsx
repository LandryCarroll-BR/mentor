'use client'

import { z } from 'zod'
import { Suspense, use } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { CheckIcon, Cross1Icon, PlusIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Textarea } from '@/ui/textarea'
import { Grid } from '@/components/layout'
import { Separator } from '@/ui/separator'
import { Video, VideoSkeleton } from '@/components/Video'
import { createAssessment } from '@/data/actions/assessment'
import { createAssessmentSchema } from '@/data/schemas/assessment'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { useResponsiveDialog } from '../responsive-dialog'
import { redirect, useRouter } from 'next/navigation'

const formSchema = createAssessmentSchema

type FormSchema = z.infer<typeof formSchema>

interface CreateAssessmentFormProps {
  organizationId: string
  userId: string
}

function CreateAssessmentForm({ organizationId, userId }: CreateAssessmentFormProps) {
  const { execute } = useAction(createAssessment)
  const router = useRouter()

  const form = useForm<FormSchema>({
    defaultValues: {
      userId,
      organizationId,
      passingScore: 70,
    },
    resolver: zodResolver(formSchema),
  })

  const questions = useFieldArray<FormSchema>({ name: 'questions', control: form.control, keyName: 'id' })

  function onSubmit(values: FormSchema) {
    execute(values)
    router.push(`/dashboard/${organizationId}/assessments`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className='col-span-2 my-4' />
        <Label className='text-xl'>Questions</Label>
        {questions.fields.map((field, number) => (
          <Grid key={field.id} className='relative col-span-2 grid-cols-2 gap-3 rounded-md border  p-4'>
            <Badge variant={'secondary'} className='w-fit'>
              Multiple Choice
            </Badge>
            <FormField
              control={form.control}
              name={`questions.${number}.title`}
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`questions.${number}.description`}
              render={({ field }) => (
                <FormItem className='col-span-2 pt-5'>
                  <FormLabel>Question Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`questions.${number}.youtubeUrl`}
              render={({ field }) => (
                <FormItem className='col-span-2 pt-5'>
                  <FormLabel>Youtube Video URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <Suspense fallback={field.value && <VideoSkeleton />}>
                    <Video src={field.value} className='pt-1' />
                  </Suspense>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label className='col-span-2 pt-5'>Choices</Label>
            <FormField
              control={form.control}
              name={`questions.${number}.choiceA`}
              render={({ field }) => {
                return (
                  <FormItem
                    className={cn('col-span-1 flex items-center gap-2 space-y-0 rounded-lg p-2', field.value.isCorrect && 'bg-primary')}
                  >
                    <FormLabel className={cn(field.value.isCorrect && 'text-primary-foreground')}>A.</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-white'
                        value={field.value.text}
                        onChange={(e) => field.onChange({ ...field.value, text: e.target.value })}
                      />
                    </FormControl>
                    <button
                      type='button'
                      className={cn(
                        'flex aspect-square h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/50 p-1 text-muted-foreground/50',
                        field.value.isCorrect && 'border-primary-foreground text-primary-foreground'
                      )}
                      onClick={() => {
                        const choiceBValues = form.getValues(`questions.${number}.choiceB`)
                        const choiceCValues = form.getValues(`questions.${number}.choiceC`)
                        const choiceDValues = form.getValues(`questions.${number}.choiceD`)

                        form.setValue(`questions.${number}.choiceB`, { ...choiceBValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceC`, { ...choiceCValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceD`, { ...choiceDValues, isCorrect: false })

                        field.onChange({ ...field.value, isCorrect: true })
                      }}
                    >
                      <CheckIcon />
                    </button>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name={`questions.${number}.choiceB`}
              render={({ field }) => {
                return (
                  <FormItem
                    className={cn('col-span-1 flex items-center gap-2 space-y-0 rounded-lg p-2', field.value.isCorrect && 'bg-primary')}
                  >
                    <FormLabel className={cn(field.value.isCorrect && 'text-primary-foreground')}>B.</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-white'
                        value={field.value.text}
                        onChange={(e) => field.onChange({ ...field.value, text: e.target.value })}
                      />
                    </FormControl>
                    <button
                      type='button'
                      className={cn(
                        'flex aspect-square h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/50 p-1 text-muted-foreground/50',
                        field.value.isCorrect && 'border-primary-foreground text-primary-foreground'
                      )}
                      onClick={() => {
                        const choiceAValues = form.getValues(`questions.${number}.choiceA`)
                        const choiceCValues = form.getValues(`questions.${number}.choiceC`)
                        const choiceDValues = form.getValues(`questions.${number}.choiceD`)

                        form.setValue(`questions.${number}.choiceA`, { ...choiceAValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceC`, { ...choiceCValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceD`, { ...choiceDValues, isCorrect: false })

                        field.onChange({ ...field.value, isCorrect: true })
                      }}
                    >
                      <CheckIcon />
                    </button>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name={`questions.${number}.choiceC`}
              render={({ field }) => {
                return (
                  <FormItem
                    className={cn('col-span-1 flex items-center gap-2 space-y-0 rounded-lg p-2', field.value.isCorrect && 'bg-primary')}
                  >
                    <FormLabel className={cn(field.value.isCorrect && 'text-primary-foreground')}>C.</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-white'
                        value={field.value.text}
                        onChange={(e) => field.onChange({ ...field.value, text: e.target.value })}
                      />
                    </FormControl>
                    <button
                      type='button'
                      className={cn(
                        'flex aspect-square h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/50 p-1 text-muted-foreground/50',
                        field.value.isCorrect && 'border-primary-foreground text-primary-foreground'
                      )}
                      onClick={() => {
                        const choiceAValues = form.getValues(`questions.${number}.choiceA`)
                        const choiceBValues = form.getValues(`questions.${number}.choiceB`)
                        const choiceDValues = form.getValues(`questions.${number}.choiceD`)

                        form.setValue(`questions.${number}.choiceA`, { ...choiceAValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceB`, { ...choiceBValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceD`, { ...choiceDValues, isCorrect: false })

                        field.onChange({ ...field.value, isCorrect: true })
                      }}
                    >
                      <CheckIcon />
                    </button>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name={`questions.${number}.choiceD`}
              render={({ field }) => {
                return (
                  <FormItem
                    className={cn('col-span-1 flex items-center gap-2 space-y-0 rounded-lg p-2', field.value.isCorrect && 'bg-primary')}
                  >
                    <FormLabel className={cn(field.value.isCorrect && 'text-primary-foreground')}>D.</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-white'
                        value={field.value.text}
                        onChange={(e) => field.onChange({ ...field.value, text: e.target.value })}
                      />
                    </FormControl>
                    <button
                      type='button'
                      className={cn(
                        'flex aspect-square h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/50 p-1 text-muted-foreground/50',
                        field.value.isCorrect && 'border-primary-foreground text-primary-foreground'
                      )}
                      onClick={() => {
                        const choiceAValues = form.getValues(`questions.${number}.choiceA`)
                        const choiceBValues = form.getValues(`questions.${number}.choiceB`)
                        const choiceCValues = form.getValues(`questions.${number}.choiceC`)

                        form.setValue(`questions.${number}.choiceA`, { ...choiceAValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceB`, { ...choiceBValues, isCorrect: false })
                        form.setValue(`questions.${number}.choiceC`, { ...choiceCValues, isCorrect: false })

                        field.onChange({ ...field.value, isCorrect: true })
                      }}
                    >
                      <CheckIcon />
                    </button>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button
              type='button'
              size='icon'
              variant={'ghost'}
              className='absolute right-1 top-1 h-6 w-6'
              onClick={() => questions.remove(number)}
            >
              <Cross1Icon />
            </Button>
          </Grid>
        ))}
        <Button
          type='button'
          variant={'outline'}
          className='col-span-2 gap-2'
          onClick={() =>
            questions.append({
              title: '',
              description: '',
              youtubeUrl: '',
              choiceA: { text: '', isCorrect: true },
              choiceB: { text: '', isCorrect: false },
              choiceC: { text: '', isCorrect: false },
              choiceD: { text: '', isCorrect: false },
            })
          }
        >
          <PlusIcon />
          Add Question
        </Button>
        <Button type='submit' className='col-span-2'>
          Save Assessment
        </Button>
      </form>
    </Form>
  )
}

export { CreateAssessmentForm }
