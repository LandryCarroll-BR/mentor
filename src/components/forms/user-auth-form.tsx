import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Icons } from '@/components/icons'
import { SignInButton } from '@/components/sign-in-button'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input id='email' placeholder='name@example.com' type='email' autoCapitalize='none' autoComplete='email' autoCorrect='off' />
          </div>
          {/* <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Sign In with Email
          </Button> */}
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <SignInButton provider='google' variant='outline' className='w-full'>
        <Icons.google className='mr-2 h-4 w-4' />
        Google
      </SignInButton>
    </div>
  )
}
