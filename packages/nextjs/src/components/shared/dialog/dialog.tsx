import { HTMLAttributes } from 'react'
import Image from 'next/image'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Modal, { ModalProps } from '@/components/shared/modal'
import Paper from '@/components/shared/paper'

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  modalProps?: Pick<ModalProps, 'onClose' | 'backdropProps' | 'onBackdropClick'>
  open: boolean
  title?: string
  Header?: React.ReactNode
  content: React.ReactNode | string
  Footer?: React.ReactNode
  close: () => void
}

const Dialog = (props: DialogProps) => {
  const { open, modalProps, Header, Footer, title = '', content = '', close, ...restProps } = props

  return (
    <Modal open={open} {...modalProps}>
      <Paper
        tw="p-0 rounded-lg flex-col justify-start overflow-hidden min-width[412px] min-height[291px] max-height[90%]"
        {...restProps}
      >
        {Header || (
          <div tw="bg-primary h-9 w-full">
            {title}
            <Image src="/icons/times.svg" alt="close icon" width={16} height={16} tw="text-white" />
          </div>
        )}
        {content}
        {Footer || <Button label="確認" className="btn" onClick={close} />}
      </Paper>
    </Modal>
  )
}

export default Dialog
