import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'

interface DeleteButtonProps {
  onClick?: () => void
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { onClick } = props
  return (
    <Button
      tw="text-gray-3 ml-2"
      className="btn-text"
      label={<FontAwesomeIcon icon={faTrash} />}
      onClick={onClick}
    />
  )
}

export default DeleteButton
