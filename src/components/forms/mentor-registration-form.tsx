'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Flex } from '@/components/layout'
import { useResponsiveDialog } from '@/components/responsive-dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { mentorRegistrationSchema } from '../../data/schemas/mentor'
import { registerMentor } from '../../data/actions/mentor'

const formSchema = mentorRegistrationSchema

type FormSchema = z.infer<typeof formSchema>

function MentorRegistrationForm({ organizationId }: { organizationId: string }) {
  const { setOpen } = useResponsiveDialog()
  const { execute, status, result } = useAction(registerMentor)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', referrerEmail: '', organizationId },
  })

  const onSubmit = async (values: FormSchema) => {
    execute(values)
  }

  if (status === 'hasSucceeded') setOpen(false)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormDescription>First and Last</FormDescription>
              <FormControl>
                <Input autoComplete={'off'} autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete={'off'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='referrerEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference Email</FormLabel>
              <FormControl>
                <Input autoComplete={'off'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Flex className='w-full pt-4'>
          <Button type='submit' className='ml-auto w-full md:w-fit' disabled={status === 'executing'}>
            Create
          </Button>
        </Flex>
      </form>
    </Form>
  )
}

export { MentorRegistrationForm }
