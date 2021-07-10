/**
 * @author Dean Chen 2021-04-15
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-unstyled/src/ModalUnstyled/ModalManager.ts
 * Modal 主要是為了詢問或提示用的彈窗，主要程式來自 Material-UI，並將其簡化至淡入淡出效果
 */

import { forwardRef, useState, useRef } from 'react'
import tw from 'twin.macro'

// components
import Backdrop from '@/components/shared/backdrop'
import Portal from '@/components/shared/portal'

// hooks
import useForkRef from '@/hooks/useForkRef'
import useEventCallback from '@/hooks/useEventCallback'

// types
import type { PortalProps } from '@/components/shared/portal'
import type { BackdropProps } from '@/components/shared/backdrop'

export interface ModalProps extends PortalProps {
  open: boolean
  onClose?: () => void | undefined
  onBackdropClick?: () => void
  backdropProps?: Partial<BackdropProps>
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(props, ref) {
  const { open, children, onClose, onBackdropClick, backdropProps = {}, ...restProps } = props
  const { onEnter, onExited, ...restBackdropProps } = backdropProps
  const [exited, setExited] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null!)
  const handleRef = useForkRef(modalRef, ref)

  const handleEnter = () => {
    setExited(false)

    if (onEnter) {
      onEnter()
    }
  }

  const handleExited = () => {
    setExited(true)

    if (onExited) {
      onExited()
    }
  }

  const handleMounted = () => {
    // Fix a bug on Chrome where the scroll isn't initially 0.
    modalRef.current.scrollTop = 0
  }

  const handlePortalRef = useEventCallback((node: HTMLElement) => {
    if (!node) {
      return
    }

    if (open) {
      handleMounted()
    } else {
      node.setAttribute('aria-hidden', 'true')
    }
  })

  const handleBackdropClick = (event: React.SyntheticEvent) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (onBackdropClick) {
      onBackdropClick()
    }

    if (onClose) {
      onClose()
    }
  }

  if (!open && exited) {
    return null
  }

  return (
    <Portal ref={handlePortalRef} {...restProps}>
      <div
        role="presentation"
        css={[tw`fixed top-0 left-0 z-10 flex`, open === false && exited && tw`invisible`]}
        ref={handleRef}
      >
        <Backdrop
          inProps={open}
          onClick={handleBackdropClick}
          onEnter={handleEnter}
          onExited={handleExited}
          {...restBackdropProps}
        >
          {children}
        </Backdrop>
      </div>
    </Portal>
  )
})

export default Modal
