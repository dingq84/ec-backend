/**
 * @author Dean Chen 2021-04-15
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-unstyled/src/ModalUnstyled/ModalManager.ts
 * Modal 主要是為了詢問或提示用的彈窗，主要程式來自 Material-UI，並將其簡化至淡入淡出效果
 */

import { forwardRef, useState, useRef } from 'react'
import tw from 'twin.macro'

// components
import Backdrop from '@/components/common/backdrop'
import Portal from '@/components/common/portal'

// hooks
import useForkRef from '@/hooks/useForkRef'
import useEventCallback from '@/hooks/useEventCallback'

// types
import { TransitionProps } from '@/types/transition'

type ModalProps = TransitionProps & {
  open: boolean
  children: any
  onClose?: Function
  onBackdropClick?: Function
}

const Modal: React.ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  props: ModalProps,
  ref
) => {
  const { open, children, onClose, onBackdropClick, onEnter, onExited } = props
  const [exited, setExited] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
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
    modalRef.current!.scrollTop = 0
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
      onBackdropClick(event)
    }

    if (onClose) {
      onClose(event)
    }
  }

  if (!open && exited) {
    return null
  }

  return (
    <Portal ref={handlePortalRef}>
      <div
        role="presentation"
        css={[tw`fixed top-0 left-0 z-10`, open === false && exited && tw`invisible`]}
        ref={handleRef}
      >
        <Backdrop
          inProps={open}
          onClick={handleBackdropClick}
          onEnter={handleEnter}
          onExited={handleExited}
        >
          {children}
        </Backdrop>
      </div>
    </Portal>
  )
}

export default forwardRef(Modal)
