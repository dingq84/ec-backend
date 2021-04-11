import { forwardRef, InputHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw, { styled } from 'twin.macro'

// components
import Collapse from '@/components/collapse'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  isFull?: boolean
  placeholder?: string
  error?: string
  clear?: Function
} & ({ label?: undefined; id?: string } | { label: string; id: string })

const StyledInput = styled.input`
  ${tw`text-gray-200 bg-light-gray-2 w-full border-2 border-solid border-transparent rounded-md h-9 px-3 py-1.5 focus:(outline-none bg-white border-dark-gray-1 text-light-gray-2)`}
  &:not(:placeholder-shown) ~ label, &:focus ~ label {
    ${tw`translate-x-0 -translate-y-full top-0 left-4 text-dark-gray-1`}
  }
  ${({ hasPlaceholder }: { hasPlaceholder: boolean }) =>
    !hasPlaceholder && tw`placeholder:(text-transparent)`}
`

// TODO: label 得特效和 清除的按鈕會造成彼此出現錯誤，需要再修復，下下策是外部傳入 value 來控制
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props: InputProps, ref) {
  const {
    id,
    label,
    placeholder,
    clear,
    error = '',
    isFull = false,
    className = '',
    ...restProps
  } = props
  // 判斷是否有 placeholder，來決定 label 呈現方式
  const hasPlaceholder = Boolean(placeholder)
  // 因為 value 有值的時候，placeholder-shown: false，因此 label 會固定在上方，但沒傳 placeholder 的話，也會 placeholder-shown:false
  // 因此需傳入一個非空字串的虛擬 placeholder 進去
  const placeholderModified = placeholder ?? 'fake placeholder'
  const hasError = Boolean(error)

  const handleClear = (): void => {
    if (clear) {
      clear()
    }
  }

  return (
    <div
      css={[isFull === true && tw`block`, isFull === false && tw`inline-block`]}
      className={className}
    >
      <div tw="relative" role="wrapper">
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
        <FontAwesomeIcon
          icon={faTimes}
          onClick={handleClear}
          tw="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-gray-2 text-xs cursor-pointer"
        />
      </div>
      <Collapse inProps={hasError} timeout={300}>
        <span tw="text-sm text-red-400 ml-2">{error}</span>
      </Collapse>
    </div>
  )
})

export default Input
