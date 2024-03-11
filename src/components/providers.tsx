'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'

function Providers({ children }: React.PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export { Providers }
