import { forwardRef, InputHTMLAttributes, Ref } from 'react'
import tw, { styled } from 'twin.macro'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  isFull?: boolean
  placeholder?: string
} & ({ label?: undefined; id?: string } | { label: string; id: string })

const StyledInput = styled.input`
  ${tw`text-gray-200 bg-light-gray-2 w-full border-2 border-solid border-transparent rounded-md h-9 px-3 py-1.5 focus:(outline-none bg-white border-dark-gray-1 text-light-gray-2 )`}
  &:not(:placeholder-shown) ~ label, &:focus ~ label {
    ${tw`translate-x-0 -translate-y-full top-0 left-4 text-dark-gray-1`}
  }
  ${({ hasPlaceholder }: { hasPlaceholder: boolean }) =>
    !hasPlaceholder && tw`placeholder:(text-transparent)`}
`

function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  const { id, label, placeholder, isFull = false, className = '', ...restProps } = props
  // 判斷是否有 placeholder，來決定 label 呈現方式
  const hasPlaceholder = Boolean(placeholder)
  // 因為 value 有值的時候，placeholder-shown: false，因此 label 會固定在上方，但沒傳 placeholder 的話，也會 placeholder-shown:false
  // 因此需傳入一個非空字串的虛擬 placeholder 進去
  const placeholderModified = placeholder ?? 'fake placeholder'
  return (
    <div css={[tw`relative`, isFull ? tw`block` : tw`inline-block`]} className={className}>
      <StyledInput
        id={id}
        ref={ref}
        placeholder={placeholderModified}
        hasPlaceholder={hasPlaceholder}
        {...restProps}
      />
      {label ? (
        <label
          htmlFor={id}
          tw="absolute text-light-gray-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all select-none"
        >
          {label}
        </label>
      ) : null}
    </div>
  )
}

export default forwardRef(Input)
