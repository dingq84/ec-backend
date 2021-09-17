import { useState } from 'react'
import 'twin.macro'

// components
import Modal from '@/components/shared/modal'
import Toast from '@/components/shared/toast'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// states
import { useAppSelector } from '@/states/hooks'

const ToastContainer = () => {
  const { toasts } = useAppSelector(state => state.toast)
  const [modalOpen, setModalOpen] = useState(false)

  useEnhancedEffect(() => {
    setModalOpen(toasts.some(toast => toast.show))
  }, [toasts])

  return (
    <Modal
      open={modalOpen}
      backdropProps={{
        invisible: true,
        hidden: true
      }}
    >
      {toasts.map((toast, index) => (
        <Toast
          {...toast}
          key={toast.id}
          style={{ bottom: 40 + (toasts.length - index - 1) * 58 }}
        />
      ))}
    </Modal>
  )
}

export default ToastContainer
