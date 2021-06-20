// types
import type { PortalProps } from '@/types/components/portal'
import type { BackdropProps } from '@/types/components/backdrop'

type ModalProps = PortalProps & {
  open: boolean
  onClose?: Function | undefined
  onBackdropClick?: Function
  backdropProps?: Partial<BackdropProps>
}

export type { ModalProps }
