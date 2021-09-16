import { forwardRef, useState, useRef, HTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import tw, { css, TwStyle } from 'twin.macro'

// components
import Popover from '@/components/shared/popover'
import TextField, { TextFieldProps } from '@/components/shared/textField'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useForkRef from '@/hooks/useForkRef'

// types
import type { Option } from '@/types/components/input'

const inputCss = css`
  & {
    & > div > div {
      ${tw`bg-white`}
    }

    & input {
      ${tw`text-black placeholder:text-black`}
    }
  }
`

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: Option[]
  value: string
  onChange?: (value: string) => void
  inputProps?: Partial<TextFieldProps>
  disabled?: boolean
  paperProps?: {
    css: TwStyle[]
  }
}

const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(props, ref) {
  const {
    options,
    onChange,
    value,
    disabled = false,
    inputProps = {},
    paperProps = { css: [] },
    ...restProps
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const handleRef = useForkRef(ref, inputRef)

  useEnhancedEffect(() => {
    if (value === '') {
      setDisplayValue('')
      return
    }

    const selectedOption = options.find(option => option.key === value)

    if (selectedOption) {
      setDisplayValue(selectedOption.value)
    } else {
      console.warn(`沒有符合 ${value} 的選項`)
    }
  }, [value])

  const openPopover = (): void => setIsOpen(true)

  const closePopover = (): void => setIsOpen(false)

  const handleClick = (option: Option): void => {
    if (onChange) {
      onChange(option.key)
    }
    closePopover()
  }

  const handleClear = (): void => {
    if (onChange) {
      onChange('')
    }
  }

  return (
    <div tw="w-full" {...restProps}>
      <TextField
        css={[inputCss]}
        border
        {...inputProps}
        ref={handleRef}
        readOnly
        onClick={openPopover}
        onClear={handleClear}
        onChange={onChange}
        adornment={{
          end: (
            <FontAwesomeIcon
              icon={faChevronDown}
              tw="color[inherit] text-sm transition-transform duration-300"
              css={[isOpen && tw`transform rotate-180`]}
            />
          )
        }}
        value={displayValue}
        disabled={disabled}
      />
      <Popover
        open={isOpen}
        onClose={closePopover}
        anchorEl={inputRef.current!}
        paperProps={{
          css: [
            tw`text-black py-2.5 pl-2.5 pr-1 bg-blue-1 text-base border border-solid border-blue-gray-1`,
            ...paperProps.css
          ]
        }}
        verticalSpace={8}
      >
        <ul
          className="scroll-y"
          tw="color[inherit] pr-5 w-full max-h-32 cursor-pointer all:(inline-block color[inherit] w-full py-2 px-3 my-1 rounded hover:(bg-blue-2))"
        >
          {options.length ? (
            options.map(option => (
              <li
                key={`option-${option.key}`}
                onClick={() => handleClick(option)}
                css={[value === option.key && tw`text-primary`]}
              >
                {option.value}
              </li>
            ))
          ) : (
            <li>目前無資料</li>
          )}
        </ul>
      </Popover>
    </div>
  )
})

export default Select
