import { useState, useRef } from 'react'
import tw, { TwStyle } from 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import Modal, { ModalProps } from '@/components/shared/modal'
import Paper from '@/components/shared/paper'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

export interface DrawerProps extends ModalProps {
  position?: 'left' | 'top' | 'right' | 'bottom'
  children: React.ReactNode
  paperProps?: {
    css: TwStyle[]
  }
}

const Drawer = (props: DrawerProps) => {
  const { open, children, position = 'left', paperProps = { css: [] }, ...restProps } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const paperRef = useRef(null!)
  const isHorizontal = ['left', 'right'].includes(position)
  const orientation = isHorizontal ? 'horizontal' : 'vertical'

  useEnhancedEffect(() => {
    if (open) {
      setIsModalOpen(open)
      setTimeout(() => {
        setIsCollapseOpen(open)
      }, 300)
    } else {
      setIsCollapseOpen(open)
      setTimeout(() => {
        setIsModalOpen(open)
      }, 300)
    }
  }, [open])

  return (
    <Modal open={isModalOpen} {...restProps}>
      <Collapse
        inProps={isCollapseOpen}
        orientation={orientation}
        tw="absolute transition-all overflow-y-auto outline-none"
        css={[
          position === 'left' && tw`left-0`,
          position === 'right' && tw`right-0`,
          position === 'top' && tw`top-0`,
          position === 'bottom' && tw`bottom-0`
        ]}
      >
        <Paper
          ref={paperRef.current}
          tw="rounded-none"
          css={[
            isHorizontal === true && tw`h-screen`,
            isHorizontal === false && tw`w-screen`,
            ...paperProps.css
          ]}
        >
          {children}
        </Paper>
      </Collapse>
    </Modal>
  )
}

export default Drawer
