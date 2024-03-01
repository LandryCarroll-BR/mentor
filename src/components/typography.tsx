import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { type buttonVariants } from '@/ui/button'

const headingVariants = cva('font-bold tracking-tight m-0', {
	variants: {
		as: {
			h1: 'text-2xl md:text-3xl',
			h2: 'text-xl md:text-2xl',
			h3: 'text-lg md:text-xl',
			h4: 'text-md md:text-lg',
		},
	},
	defaultVariants: {
		as: 'h1',
	},
})

interface HeadingProps
	extends React.HtmlHTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof buttonVariants> {
	as: 'h1' | 'h2' | 'h3' | 'h4'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ as, children, className, ...props }, ref) => {
		const Comp = as

		return (
			<Comp ref={ref} className={headingVariants({ as, className })} {...props}>
				{children}
			</Comp>
		)
	}
)
Heading.displayName = 'Heading'

const Paragraph = React.forwardRef<
	HTMLParagraphElement,
	React.HtmlHTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => (
	<p ref={ref} className={cn('font-normal tracking-normal', className)} {...props}>
		{children}
	</p>
))
Paragraph.displayName = 'Paragraph'

export { Heading, Paragraph }
