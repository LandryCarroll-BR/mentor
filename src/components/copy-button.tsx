'use client'

import * as React from 'react'
import { cn, copyToClipboard } from '@/lib/utils'
import { Button, ButtonProps } from '@/ui/button'
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'

interface CopyButtonProps extends ButtonProps {
  string: string
}

function CopyButton({ children, string, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      className='gap-2 pl-3'
      size={'sm'}
      onClick={() => {
        copyToClipboard(string)
        setHasCopied(true)
      }}
      {...props}
    >
      <CheckIcon className={cn('flex h-3 w-0 opacity-0 transition-all', hasCopied && 'w-3 opacity-100')} />
      <CopyIcon className={cn('-ml-2 flex h-3 w-3 opacity-100 transition-all', hasCopied && 'w-0 opacity-0')} />
      {children}
    </Button>
  )
}

export { CopyButton }
