'use client'

import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface BaseProps {
  children: React.ReactNode
}

interface RootModalProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface ModalProps extends BaseProps {
  className?: string
  asChild?: boolean
}

const ModalContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: true,
})

const useModalContext = () => {
  const context = React.useContext(ModalContext)

  if (!context) {
    throw new Error('Modal components must be used within a Modal')
  }

  return context
}

const Modal = ({ children, ...props }: RootModalProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const Modal = isDesktop ? Dialog : Drawer

  return (
    <ModalContext.Provider value={{ isDesktop }}>
      <Modal {...props}>{children}</Modal>
    </ModalContext.Provider>
  )
}

const ModalTrigger = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalTrigger = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <ModalTrigger className={className} {...props}>
      {children}
    </ModalTrigger>
  )
}

const ModalClose = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalClose = isDesktop ? DialogClose : DrawerClose

  return (
    <ModalClose className={className} {...props}>
      {children}
    </ModalClose>
  )
}

const ModalContent = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalContent = isDesktop ? DialogContent : DrawerContent

  return (
    <ModalContent className={className} {...props}>
      {children}
    </ModalContent>
  )
}

const ModalDescription = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalDescription = isDesktop ? DialogDescription : DrawerDescription

  return (
    <ModalDescription className={className} {...props}>
      {children}
    </ModalDescription>
  )
}

const ModalHeader = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalHeader = isDesktop ? DialogHeader : DrawerHeader

  return (
    <ModalHeader className={className} {...props}>
      {children}
    </ModalHeader>
  )
}

const ModalTitle = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalTitle = isDesktop ? DialogTitle : DrawerTitle

  return (
    <ModalTitle className={className} {...props}>
      {children}
    </ModalTitle>
  )
}

const ModalFooter = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop } = useModalContext()
  const ModalFooter = isDesktop ? DialogFooter : DrawerFooter

  return (
    <ModalFooter className={className} {...props}>
      {children}
    </ModalFooter>
  )
}

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
}
