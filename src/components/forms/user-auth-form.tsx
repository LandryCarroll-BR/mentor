'use client'

import { z } from 'zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Icons } from '@/components/icons'
import { Box, Flex, Grid } from '@/components/layout'
import { signInWithEmail } from '@/data/actions/auth'
import { SignInButton } from '@/components/sign-in-button'
import { signInWithEmailSchema } from '@/data/schemas/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const formSchema = signInWithEmailSchema

type FormSchema = z.infer<typeof formSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { execute, status } = useAction(signInWithEmail)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit({ email }: FormSchema) {
    execute({ email })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('grid gap-6', className)} {...props}>
        <Grid className='gap-2'>
          <FormField
            name='email'
            render={({ field }) => (
              <FormItem className='grid gap-1'>
                <FormLabel className='sr-only'>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={status === 'executing'}>
            {status === 'executing' && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Sign In with Email
          </Button>
        </Grid>
      </form>
      <Box className='relative'>
        <Flex className='absolute inset-0 items-center'>
          <span className='w-full border-t' />
        </Flex>
        <Flex className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </Flex>
      </Box>
      <SignInButton provider='google' variant='outline' className='w-full'>
        <Icons.google className='mr-2 h-4 w-4' />
        Google
      </SignInButton>
    </Form>
  )
}
