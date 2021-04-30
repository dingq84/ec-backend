/**
 * @author Dean Chen 2021-04-30
 * TextField 從原本的 Input component 改名而來，將 type 為 text、 password 獨立出來，
 * checkbox、radio、select 則透過其他 component 處理
 * 有兩個直得討論的功能
 * 1. 使用看不見的 placeholder: 透過看不見的 placeholder 完成 label 的動畫，因為 react-hook-form 的 watch 或 useWatch，
 * 無論哪一個都會造成父層或子層隨著 change event 而渲染
 * 2. 新增 mouse down event 來處理 點選清除按鈕時造成 input blur 的問題
 */

import { InputHTMLAttributes, forwardRef, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw, { styled } from 'twin.macro'

// components
import Collapse from '@/components/common/collapse'
import useForkRef from '@/hooks/useForkRef'

type StyledInputProps = {
  hasPlaceholder: boolean
  isFocused: boolean
  hasStartAdornment: boolean
  hasEndAdornment: boolean
}

const StyledInput = styled.input`
  ${tw`text-gray-200 bg-light-blue-1 w-full border-2 border-solid border-transparent rounded-md h-9 pl-3 py-1.5 pr-6`}

  &:disabled {
    ${tw`bg-dark-gray-1 cursor-not-allowed`}

    & ~ label {
      ${tw`cursor-not-allowed`}
    }

    & ~ div {
      ${tw`hidden`}
    }
  }

  &:not(:placeholder-shown) ~ label {
    ${tw`translate-x-0 -translate-y-full top-0 left-4 text-dark-gray-1`}
  }

  ${({ hasPlaceholder }: StyledInputProps) => !hasPlaceholder && tw`placeholder:(text-transparent)`}

  ${({ isFocused }: StyledInputProps) =>
    isFocused && tw`outline-none bg-white border-dark-gray-1 text-light-gray-2`}

  ${({ hasStartAdornment }: StyledInputProps) => hasStartAdornment && tw`pl-6`}

  ${({ hasEndAdornment }: StyledInputProps) => hasEndAdornment && tw`pr-12`}
`

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  name: string
  isFull?: boolean
  type?: 'text' | 'password'
  label?: string
  error?: string
  className?: string
  inputClassName?: string
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
  onClear?: () => void
}

const TextField: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  props: TextFieldProps,
  ref
) => {
  const {
    id,
    label,
    placeholder,
    onClear,
    className = '',
    inputClassName = '',
    error = '',
    isFull = true,
    startAdornment,
    endAdornment,
    ...restProps
  } = props
  const [focused, setFocused] = useState(false)
  const isClearing = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleRef = useForkRef(inputRef, ref)
  const isFloatLabel = placeholder || focused
  const hasError = Boolean(error)
  const hasStartAdornment = Boolean(startAdornment)
  const hasEndAdornment = Boolean(endAdornment)
  // 判斷是否有 placeholder，來決定 label 呈現方式
  const hasPlaceholder = Boolean(placeholder)
  // 因為 value 有值的時候，placeholder-shown: false，因此 label 會固定在上方，但沒傳 placeholder 的話，也會 placeholder-shown:false
  // 因此需傳入一個非空字串的虛擬 placeholder 進去
  const placeholderModified = placeholder || 'hidden placeholder'

  // mousedown、blur、click 發生順序依序為 mousedown -> blur -> click，因為 clear function 會觸發 blur
  // 因此在 mousedown 這邊先進行判斷是否進行 clear
  const handleMouseDown = (): void => {
    isClearing.current = true
  }

  const handleFocus = (): void => {
    setFocused(true)
  }

  const handleBlur = (): void => {
    if (isClearing.current === false) {
      setFocused(false)
    }
  }

  const handleClear = (): void => {
    isClearing.current = false
    inputRef.current!.focus()
    if (onClear) {
      onClear()
    }
  }

  return (
    <div css={[isFull === false && tw`inline-block`]} className={className}>
      <div tw="relative">
        {hasStartAdornment ? (
          <span tw="absolute text-light-gray-2 text-xs top-1/2 left-2 transform -translate-y-1/2 vertical-align[0]">
            {startAdornment}
          </span>
        ) : null}

        <StyledInput
          ref={handleRef}
          id={id}
          hasStartAdornment={hasStartAdornment}
          hasPlaceholder={hasPlaceholder}
          isFocused={focused}
          hasEndAdornment={hasEndAdornment}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholderModified}
          className={inputClassName}
          {...restProps}
        />
        {label ? (
          <label
            htmlFor={id}
            tw="absolute text-light-gray-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all select-none"
            css={[
              isFloatLabel && tw`translate-x-0 -translate-y-full top-0 left-4 text-dark-gray-1`
            ]}
          >
            {label}
          </label>
        ) : null}

        <div tw="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-gray-2 text-xs flex items-center">
          {endAdornment || null}
          {onClear ? (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={handleClear}
              onMouseDown={handleMouseDown}
              tw="cursor-pointer ml-2"
            />
          ) : null}
        </div>
      </div>

      <Collapse inProps={hasError}>
        <span tw="text-sm text-red-400 ml-2">{error}</span>
      </Collapse>
    </div>
  )
}

export default forwardRef(TextField)
