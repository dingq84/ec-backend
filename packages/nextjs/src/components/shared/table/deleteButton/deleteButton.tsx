import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { MouseEvent } from 'react'
import 'twin.macro'

// components
import Button from '@/components/shared/button'

interface DeleteButtonProps {
  onClick?: () => void
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { onClick } = props
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (onClick) {
      onClick()
    }
  }

  return (
    <Button
      tw="text-gray-3 ml-1 w-5 h-5"
      className="btn-text"
      label={<FontAwesomeIcon tw="text-base" icon={faTimes} />}
      onClick={handleClick}
    />
  )
}

export default DeleteButton
