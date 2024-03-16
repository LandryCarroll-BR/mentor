'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/ui/form'
import { Button } from '../ui/button'
import { LoaderData } from '../../lib/utils'
import { fetchUserOrganization } from '../../data/queries/user-organization'
import { useAction } from 'next-safe-action/hooks'
import { updateUserOrganization } from '../../data/actions/user-organization'
import { updateUserOrgSchema } from '../../data/schemas/organization'

const formSchema = updateUserOrgSchema

type FormSchema = z.infer<typeof formSchema>

function UpdateOrganizationForm({ organization, userId }: { organization: LoaderData<typeof fetchUserOrganization>; userId: string }) {
  const { execute, status } = useAction(updateUserOrganization)

  const form = useForm<FormSchema>({
    defaultValues: {
      organizationName: organization.organization.name,
      organizationId: organization.organization.id,
      userId,
    },
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: FormSchema) {
    execute(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          name='organizationName'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='w-fit' disabled={status === 'executing'}>
          Save Settings
        </Button>
      </form>
    </Form>
  )
}

export { UpdateOrganizationForm }
