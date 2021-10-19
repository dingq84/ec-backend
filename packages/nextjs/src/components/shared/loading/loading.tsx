import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Modal from '@/components/shared/modal'

interface LoadingProps {
  isLoading: boolean
}

const Loading = (props: LoadingProps) => {
  const { isLoading } = props
  return (
    <Modal open={isLoading} tw="z-50">
      <FontAwesomeIcon icon={faSpinner} tw="animate-spin text-4xl text-primary" />
    </Modal>
  )
}

export default Loading
