import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import Fade from '@/components/shared/fade'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'onClear'
> & {
  type?: 'text' | 'password'
  value?: string
  error?: boolean // 判斷是否有錯誤，每個錯誤不一定需要錯誤訊息
  errorMessage?: string // 錯誤訊息
  adornment?: {
    start?: JSX.Element
    end?: JSX.Element
  }
  clear?: boolean // 預設有 x 按鈕
  border?: boolean // 預設有 border
  labelPosition?: 'top' | 'left' // label 在 input 的上方或是下方，預設上方
  onChange?: (value: string) => void
  onClear?: () => void
} & ({ id: string; label: string } | { id?: undefined; label?: undefined })

const TextField: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  props: TextFieldProps,
  ref
) => {
  const {
    id,
    label,
    onClear,
    onChange,
    errorMessage,
    adornment = {
      start: null,
      end: null
    },
    error = false,
    disabled = false,
    clear = true,
    value: initialValue = '',
    labelPosition = 'top',
    className = '',
    border = true,
    ...restProps
  } = props

  const [value, setValue] = useState(initialValue)
  useEnhancedEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (onChange) {
      onChange(event.target.value)
    }
  }

  const handleClear = () => {
    if (disabled) {
      return
    }

    setValue('')
    if (onClear) {
      onClear()
    }
  }

  return (
    <div className={className}>
      <div
        tw="w-full text-blue-1 flex flex-col"
        css={[labelPosition === 'left' && tw`flex-row space-y-0 space-x-1.5 items-center`]}
      >
        {label ? (
          <label tw="text-sm text-black" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div
          tw="border border-solid border-blue-1 py-1 px-2 text-sm rounded space-x-1 flex items-center"
          css={[
            error && tw`border-red-500`,
            disabled && tw`bg-gray-1 text-black`,
            border === false && `border-none`
          ]}
        >
          {adornment.start}
          <input
            tw="color[inherit] border-none flex-grow placeholder:(text-xs)"
            id={id}
            value={value}
            onChange={handleChange}
            ref={ref}
            disabled={disabled}
            css={[disabled && tw`cursor-not-allowed`]}
            {...restProps}
          />
          <Fade inProps={clear && value !== ''}>
            <button
              tw="mr-1! leading-none h-3.5"
              css={[disabled && tw`cursor-not-allowed`]}
              onClick={handleClear}
              data-testid="clear"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </Fade>
          {adornment.end}
        </div>
      </div>
      <Collapse inProps={error}>
        <span tw="inline-block ml-1 h-3 leading-none text-red-500 text-xs">{errorMessage}</span>
      </Collapse>
    </div>
  )
}

export default forwardRef(TextField)
