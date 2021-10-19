import Image from 'next/image'
import { MouseEvent } from 'react'
import 'twin.macro'

// components
import Button from '@/components/shared/button'

interface EditButtonProps {
  onClick?: () => void
}

const EditButton = (props: EditButtonProps) => {
  const { onClick } = props
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (onClick) {
      onClick()
    }
  }

  return (
    <Button
      tw="text-gray-3 ml-1"
      className="btn-text"
      label={<Image src="/icons/pen.svg" alt="pen" width={20} height={20} />}
      onClick={handleClick}
    />
  )
}

export default EditButton
