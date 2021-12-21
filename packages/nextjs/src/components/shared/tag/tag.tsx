/**
 * @author Ding.Chen 2021-06-23
 * 建立一個 tag 標籤，可使用在 tag 或是 select 內
 */

import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Button, { ButtonProps } from '@/components/shared/button'

interface WithClear extends ButtonProps {
  clear?: true // 預設 true，會出現 x 按鈕
  // onClear: (name: string) => void
  onClear: () => void
}

interface WithoutClear extends ButtonProps {
  clear?: false | undefined
  onClear?: undefined
}

export type TagProps = WithClear | WithoutClear

const Tag = forwardRef<HTMLButtonElement, TagProps>(function Tag(props, ref) {
  const { label, disabled, className = '', clear = true, onClear, ...restProps } = props
  return (
    <Button
      ref={ref}
      className={`btn-outline ${className}`}
      tw="rounded-3xl py-0.5"
      css={[
        disabled &&
          tw`border-transparent bg-gray-1 text-black pointer-events-none cursor-not-allowed`
      ]}
      label={
        <>
          <span>{label}</span>
          {clear ? (
            <button onClick={onClear} tw="ml-1">
              <FontAwesomeIcon icon={faTimes} tw="text-xs" />
            </button>
          ) : null}
        </>
      }
      {...restProps}
    />
  )
})

export default Tag
