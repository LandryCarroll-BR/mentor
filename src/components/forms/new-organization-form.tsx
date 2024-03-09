'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Flex } from '@/components/layout'
import { createUserOrgSchema } from '@/data/schemas/organization'
import { useResponsiveDialog } from '@/components/responsive-dialog'
import { createUserOrganization } from '@/root/src/data/actions/user-organization'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'

const formSchema = createUserOrgSchema

type FormSchema = z.infer<typeof formSchema>

function CreateOrganizationForm({ userId }: { userId: string }) {
  const { setOpen } = useResponsiveDialog()
  const { execute, status, result } = useAction(createUserOrganization)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', userId },
  })

  const onSubmit = async (values: FormSchema) => {
    execute(values)
  }

  if (status === 'hasSucceeded') setOpen(false)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormDescription>Please provide a name for your organization.</FormDescription>
              <FormControl>
                <Input autoComplete={'off'} autoFocus {...field} />
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

export { CreateOrganizationForm }
