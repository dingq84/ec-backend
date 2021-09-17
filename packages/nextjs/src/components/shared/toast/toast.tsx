import Image from 'next/image'
import { useState, useRef, HTMLAttributes } from 'react'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// states
import { useAppDispatch } from '@/states/hooks'
import { removeToast } from '@/states/toast'

export interface Toast {
  id: string
  show: boolean
  message: string
  close?: () => void
  manualClose?: boolean
  autoClose?: boolean
  closeTimeout?: number
  level?: 'info' | 'warning' | 'remind' | 'success'
}

export interface ToastProps extends Toast, Omit<HTMLAttributes<HTMLDivElement>, 'id'> {}

const Toast = (props: ToastProps) => {
  const {
    id,
    show,
    message,
    close,
    manualClose = true,
    autoClose = true,
    closeTimeout = 3000,
    level = 'info',
    ...restProps
  } = props
  const [toastOpen, setToastOpen] = useState(false)
  const dispatch = useAppDispatch()
  const timer = useRef(0)

  useEnhancedEffect(() => {
    if (show) {
      setTimeout(() => {
        setToastOpen(true)
      }, 300)
    } else {
      closeToast()
    }
  }, [show])

  useEnhancedEffect(() => {
    if (autoClose) {
      timer.current = window.setTimeout(() => {
        closeToast()
      }, closeTimeout)
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [autoClose])

  const closeToast = (): void => {
    setToastOpen(false)
    clearTimeout(timer.current)
    setTimeout(() => {
      dispatch(removeToast({ id }))
    }, 300)

    if (close) {
      close()
    }
  }

  return (
    <div
      tw="rounded-lg border border-solid py-1.5 px-3 flex items-center justify-center transition-all duration-300 fixed -left-full mt-5"
      css={[
        level === 'info' && tw`border-blue-10 bg-blue-9`,
        level === 'warning' && tw`border-red-3 bg-red-2`,
        level === 'success' && tw`border-green-2 bg-green-1`,
        level === 'remind' && tw`border-yellow-2 bg-yellow-1`,
        toastOpen && tw`left-20 animate-shake`
      ]}
      {...restProps}
    >
      <Image src={`/icons/toast/${level}.svg`} alt="toast icon" width={24} height={24} />
      <span tw="ml-2 font-normal text-sm text-black select-none">{message}</span>
      {manualClose ? (
        <Button
          className="btn-text"
          tw="ml-10"
          onClick={closeToast}
          label={<Image src="/icons/times.svg" alt="close icon" width={8} height={8} />}
        />
      ) : null}
    </div>
  )
}

export default Toast
