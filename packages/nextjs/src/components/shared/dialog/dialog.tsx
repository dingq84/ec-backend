import { HTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
        tw="rounded-lg flex flex-col justify-start items-center overflow-hidden min-width[412px] min-height[291px] max-height[90%]"
        {...restProps}
      >
        {Header || (
          <div tw="bg-primary h-9 w-full">
            {title}
            <FontAwesomeIcon
              icon={faTimes}
              tw="text-white text-sm mt-3 mr-5 float-right cursor-pointer"
              onClick={close}
            />
          </div>
        )}
        {content}
        {Footer || <Button label="確認" className="btn" onClick={close} />}
      </Paper>
    </Modal>
  )
}

export default Dialog
