import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Button, { ButtonProps } from '@/components/shared/button'

export type TagProps = ButtonProps & {
  clear?: boolean // 預設 true，會出現 x 按鈕
}

const Tag: React.ForwardRefRenderFunction<HTMLButtonElement, TagProps> = (props: TagProps, ref) => {
  const { label, disabled, className = '', clear = true, ...restProps } = props
  return (
    <Button
      ref={ref}
      className={`btn-outline ${className}`}
      tw="rounded-3xl py-1.5"
      css={[
        disabled &&
          tw`border-transparent bg-gray-1 text-black pointer-events-none cursor-not-allowed`
      ]}
      label={
        <>
          <span>{label}</span>
          {clear ? <FontAwesomeIcon icon={faTimes} tw="text-xs" /> : null}
        </>
      }
      {...restProps}
    />
  )
}

export default forwardRef(Tag)
