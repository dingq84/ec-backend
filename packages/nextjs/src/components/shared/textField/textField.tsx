import { ChangeEvent, forwardRef, HTMLAttributes, Ref, MouseEvent } from 'react'
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
    border = false,
    inputRef,
    type = 'text',
    name = 'input',
    placeholder = '',
    readOnly = false,
    ...restProps
  } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  const handleClear = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()

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
          tw="py-1.5 px-2.5 rounded-lg border border-solid border-blue-gray-3 flex items-center text-black space-x-1 bg-blue-2 h-9"
          css={[
            border === false && error === false && tw`border-none`,
            error && tw`border-red-1`,
            disabled && tw`bg-blue-1 text-blue-gray-3 border-none`
          ]}
        >
          {/* 針對 start adornment 和 input 包起來，讓他可以有 wrap 的樣子，end adornment 和 clear button 維持垂直置中 */}
          <div tw="flex items-center flex-grow space-x-1">
            {adornment.start}
            <input
              tw="color[inherit] font-normal border-none rounded flex-grow w-full h-6 font-size[inherit] placeholder:(text-gray-3)"
              id={id}
              value={value}
              onChange={handleChange}
              ref={inputRef}
              disabled={disabled}
              css={[disabled && tw`cursor-not-allowed`]}
              type={type}
              name={name}
              placeholder={placeholder}
              readOnly={readOnly}
            />
          </div>

          <Fade inProps={clear && value !== '' && disabled === false}>
            <button
              tw="text-xs mr-1! leading-none h-3.5 color[inherit]"
              css={[
                disabled && tw`cursor-not-allowed`,
                Boolean(adornment.end) && tw`pr-2 border-r rounded-none border-white border-solid`
              ]}
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
