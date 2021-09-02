import Image from 'next/image'
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
      label={<Image src="/icons/pen.svg" alt="pen" width={20} height={20} />}
      onClick={onClick}
    />
  )
}

export default EditButton
