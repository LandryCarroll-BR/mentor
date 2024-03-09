'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/root/src/hooks/use-media-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer'

type ResponsiveDialogContextValue = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ResponsiveDialogContext = React.createContext<ResponsiveDialogContextValue>({ open: false, setOpen: () => {} })

const useResponsiveDialog = () => {
  const responsiveDialogContext = React.useContext(ResponsiveDialogContext)
  if (!responsiveDialogContext) throw new Error('useResponsiveDialog must be used within <ResponsiveDialog>')
  return responsiveDialogContext
}

const ResponsiveDialog: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <ResponsiveDialogContext.Provider value={{ open, setOpen }}>
        <Dialog open={open} onOpenChange={setOpen}>
          {children}
        </Dialog>
      </ResponsiveDialogContext.Provider>
    )
  }

  return (
    <ResponsiveDialogContext.Provider value={{ open, setOpen }}>
      <Drawer open={open} onOpenChange={setOpen}>
        {children}
      </Drawer>
    </ResponsiveDialogContext.Provider>
  )
}

const ResponsiveDialogTrigger: React.FC<React.ComponentProps<typeof DialogTrigger>> = ({ children, ...props }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) return <DialogTrigger {...props}>{children}</DialogTrigger>

  return <DrawerTrigger {...props}>{children}</DrawerTrigger>
}

const ResponsiveDialogContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) return <DialogContent>{children}</DialogContent>

  return (
    <DrawerContent className='overflow-hidden'>
      {children}
      <DrawerFooter className='mx-auto w-full max-w-sm pt-3'>
        <DrawerClose asChild>
          <Button variant='outline'>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  )
}

export { ResponsiveDialog, useResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTrigger }
