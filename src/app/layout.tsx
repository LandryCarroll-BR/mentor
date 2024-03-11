import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Mentor App',
  description: 'A way to connect mentors to mentees',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Providers>
        <body className={cn(inter.variable, 'flex min-h-dvh flex-col font-sans antialiased')}>{children}</body>
      </Providers>
    </html>
  )
}
