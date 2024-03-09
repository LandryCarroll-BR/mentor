'use client'

import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface ActiveLinkProps extends LinkProps {
  href: string
  className?: string
  activeClassName?: string
}

function ActiveLink({ activeClassName, children, className, href, ...props }: React.PropsWithChildren<ActiveLinkProps>) {
  const pathname = usePathname()
  const isActive = pathname == href

  return (
    <Link className={cn(isActive && activeClassName, className)} href={href} {...props}>
      {children}
    </Link>
  )
}

export { ActiveLink }
