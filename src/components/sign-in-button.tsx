'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { BuiltInProviderType } from 'next-auth/providers'

import { Form } from '@/ui/form'
import { Button } from '@/ui/button'
import { signInWithProvider } from '@/data/actions/auth'
import { signInWithProviderSchema } from '@/data/schemas/auth'

const formSchema = signInWithProviderSchema

type FormSchema = z.infer<typeof formSchema>

type SignInButtonProps = { provider?: BuiltInProviderType } & React.ComponentPropsWithRef<typeof Button>

function SignInButton({ children, provider, ...props }: SignInButtonProps) {
  const { execute, status } = useAction(signInWithProvider)

  const form = useForm<FormSchema>({
    defaultValues: { provider },
    resolver: zodResolver(formSchema),
  })

  async function onSubmit({ provider }: FormSchema) {
    execute({ provider })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button disabled={status === 'executing'} {...props}>
          {children}
        </Button>
      </form>
    </Form>
  )
}

export { SignInButton }
