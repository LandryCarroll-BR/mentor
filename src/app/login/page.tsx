import Link from 'next/link'
import Image from 'next/image'

import { UserAuthForm } from '@/components/forms/user-auth-form'
import { Main } from '@/components/main'
import { Icons } from '@/components/icons'
import { Box, Flex, Section } from '@/components/layout'

export default async function Login() {
  return (
    <Main className='container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Flex className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <Image
          alt='An abstract background image'
          src='https://images.unsplash.com/photo-1702027339811-eb6a69dfaa2a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          fill
          className='w-full object-cover object-bottom'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 to-zinc-50/0' />
        <Flex className='relative z-20 flex items-center text-lg font-medium'>
          <Icons.logo className='mr-2 h-6 w-6' />
          Mentor
        </Flex>
        <Box className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;A mentor is not someone who walks ahead of us to show us how they did it. A mentor is someone who
              walks alongside us to show us what we can do.&rdquo;
            </p>
            <footer className='text-sm'>John C. Maxwell</footer>
          </blockquote>
        </Box>
      </Flex>
      <Flex className='flex flex-col lg:p-8'>
        <Section className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
          <Flex className='relative z-20 items-center justify-center text-lg font-medium lg:hidden'>
            <Icons.logo className='mr-2 h-6 w-6' />
            Mentor
          </Flex>
          <Flex className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign in to your account</h1>
            <p className='text-sm text-muted-foreground'>Enter your email below to create your account or sign in</p>
          </Flex>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
              Privacy Policy
            </Link>
            .
          </p>
        </Section>
      </Flex>
    </Main>
  )
}
