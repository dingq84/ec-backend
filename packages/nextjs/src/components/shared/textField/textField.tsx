import { ChangeEvent, forwardRef, HTMLAttributes, Ref } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Fade from '@/components/shared/fade'

// types
import type { InputBasicType } from '@/types/components/input'

export interface TextFieldProps
  extends InputBasicType<string>,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  type?: 'text' | 'password'
  adornment?: {
    start?: JSX.Element
    end?: JSX.Element
  }
  hint?: string
  clear?: boolean // 預設有 x 按鈕
  border?: boolean // 預設有 border
  inputRef?: Ref<HTMLInputElement> // 掛載在 input 上面的 ref
  onClear?: () => void
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(function TextField(
  props: TextFieldProps,
  ref
) {
  const {
    id,
    label,
    onClear,
    onChange,
    adornment = {
      start: null,
      end: null
    },
    hint = '',
    error = false,
    disabled = false,
    clear = true,
    value = '',
    labelPosition = 'top',
    border = true,
    inputRef,
    type = 'text',
    name = 'input',
    placeholder = '',
    ...restProps
  } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  const handleClear = () => {
    if (disabled) {
      return
    }

    if (onClear) {
      onClear()
    }
  }

  return (
    <div ref={ref} {...restProps}>
      <div
        tw="w-full text-blue-2 flex flex-col"
        css={[labelPosition === 'left' && tw`flex-row space-y-0 space-x-1.5 items-center`]}
      >
        {label ? (
          <label tw="text-base font-normal text-black mb-1" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div
          tw="py-1.5 px-2.5 rounded-lg flex items-center space-x-1 bg-blue-2"
          css={[
            error && tw`border-red-1 border border-solid`,
            disabled && tw`bg-gray-1 text-black`,
            border === false && `border-none`
          ]}
        >
          {/* 針對 start adornment 和 input 包起來，讓他可以有 wrap 的樣子，end adornment 和 clear button 維持垂直置中 */}
          <div tw="flex items-center flex-grow flex-wrap space-x-1">
            {adornment.start}
            <input
              tw="text-black font-normal border-none rounded flex-grow h-6 text-base placeholder:(text-gray-3)"
              id={id}
              value={value}
              onChange={handleChange}
              ref={inputRef}
              disabled={disabled}
              css={[disabled && tw`cursor-not-allowed`]}
              type={type}
              name={name}
              placeholder={placeholder}
            />
          </div>

          <Fade inProps={clear && value !== ''}>
            <button
              tw="mr-1! leading-none h-3.5"
              css={[disabled && tw`cursor-not-allowed`]}
              onClick={handleClear}
              data-testid="clear"
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </Fade>
          {adornment.end}
        </div>

        {hint ? <small tw="text-gray-2 font-normal">{hint}</small> : ''}
      </div>
    </div>
  )
})

export default TextField
