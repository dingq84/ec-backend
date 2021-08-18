import Image from 'next/image'
import { useState, useRef } from 'react'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Modal from '@/components/shared/modal'
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

export interface ToastProps {
  show: boolean
  message: string
  close?: boolean
  autoClose?: boolean
  closeTimeout?: number
  position?:
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'bottom'
    | 'rightBottom'
    | 'right'
    | 'rightTop'
    | 'top'
  level?: 'info' | 'warning' | 'remind' | 'success'
}

const Toast = (props: ToastProps) => {
  const {
    show,
    message,
    close = true,
    autoClose = true,
    closeTimeout = 3000,
    level = 'info',
    position = 'leftBottom'
  } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const timer = useRef(0)

  useEnhancedEffect(() => {
    if (autoClose && show) {
      timer.current = window.setTimeout(() => {
        closeToast()
      }, closeTimeout)
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [show])

  useEnhancedEffect(() => {
    if (show) {
      setModalOpen(show)
      setTimeout(() => {
        setToastOpen(show)
      }, 300)
    } else {
      setToastOpen(show)
      setTimeout(() => {
        setModalOpen(show)
      }, 300)
    }
  }, [show])

  const closeToast = (): void => {
    setModalOpen(false)
    setToastOpen(false)
    clearTimeout(timer.current)
  }

  return (
    <Modal
      open={modalOpen}
      backdropProps={{
        invisible: true,
        hidden: true
      }}
    >
      <div
        tw="rounded-lg border border-solid py-1.5 px-3 inline-flex items-center justify-center fixed transition-all duration-300"
        css={[
          level === 'info' && tw`border-blue-10 bg-blue-9`,
          level === 'warning' && tw`border-red-3 bg-red-2`,
          level === 'success' && tw`border-green-2 bg-green-1`,
          level === 'remind' && tw`border-yellow-2 bg-yellow-1`,
          position === 'left' && tw`bottom-1/2 transform -translate-y-1/2 -left-full`,
          position === 'leftTop' && tw`top-10 -left-full`,
          position === 'leftBottom' && tw`bottom-10 -left-full`,
          position === 'bottom' && tw`-bottom-full left-1/2 transform -translate-x-1/2`,
          position === 'rightBottom' && tw`bottom-10 -right-full`,
          position === 'right' && tw`bottom-1/2 transform -translate-y-1/2 -right-full`,
          position === 'rightTop' && tw`top-10 -right-full`,
          position === 'top' && tw`-top-full left-1/2 transform -translate-x-1/2`,
          toastOpen === true && position.includes('left') && tw`left-20`,
          toastOpen === true && position.includes('right') && tw`right-20`,
          toastOpen === true && position === 'bottom' && tw`bottom-10`,
          toastOpen === true && position === 'top' && tw`top-10`
        ]}
      >
        <Image src={`/icons/${level}.svg`} alt="toast icon" width={24} height={24} />
        <span tw="ml-2 font-normal text-sm text-black select-none">{message}</span>
        {close ? (
          <Button
            className="btn-text"
            tw="ml-10"
            onClick={closeToast}
            label={<Image src="/icons/times.svg" alt="close icon" width={8} height={8} />}
          />
        ) : null}
      </div>
    </Modal>
  )
}

export default Toast
