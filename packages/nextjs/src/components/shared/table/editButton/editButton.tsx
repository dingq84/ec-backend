import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'

interface EditButtonProps {
  onClick?: () => void
}

const EditButton = (props: EditButtonProps) => {
  const { onClick } = props
  return (
    <Button
      tw="text-gray-3 ml-2"
      className="btn-text"
      label={<FontAwesomeIcon icon={faPen} />}
      onClick={onClick}
    />
  )
}

export default EditButton
