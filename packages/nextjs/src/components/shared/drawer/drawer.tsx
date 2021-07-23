import { useState, useRef } from 'react'
import tw from 'twin.macro'

// components

import Collapse from '@/components/shared/collapse'
import Modal from '@/components/shared/modal'
import Paper from '@/components/shared/paper'
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

export interface DrawerProps {
  open: boolean
  position?: 'left' | 'top' | 'right' | 'bottom'
  children: React.ReactNode
}

const Drawer = (props: DrawerProps) => {
  const { open, children, position = 'left' } = props
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
    <Modal open={isModalOpen}>
      <Collapse
        inProps={isCollapseOpen}
        orientation={orientation}
        tw="absolute transition-all overflow-y-auto overflow-x-hidden outline-none"
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
          css={[isHorizontal === true && tw`h-screen`, isHorizontal === false && tw`w-screen`]}
        >
          {children}
        </Paper>
      </Collapse>
    </Modal>
  )
}

export default Drawer
