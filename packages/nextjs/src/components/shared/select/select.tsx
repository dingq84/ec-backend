import { forwardRef, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Popover from '@/components/shared/popover'
import TextField, { TextFieldProps } from '@/components/shared/textField'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useForkRef from '@/hooks/useForkRef'

// types
import type { Option } from '@/types/components/input'

export interface SelectProps {
  options: Option[]
  value: ''
  onChange?: (value: string) => void
  inputProps?: Partial<TextFieldProps>
  disabled?: boolean
}

const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(props, ref) {
  const { options, onChange, value, disabled = false, inputProps = {} } = props
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const handleRef = useForkRef(ref, inputRef)

  useEnhancedEffect(() => {
    if (value) {
      const selectedOption = options.find(option => option.key === value)

      if (selectedOption) {
        setDisplayValue(selectedOption.value)
      } else {
        console.warn(`沒有符合 ${value} 的選項`)
      }
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

  const handleClear = () => {
    if (onChange) {
      onChange('')
    }
  }

  return (
    <div tw="w-full">
      <TextField
        {...inputProps}
        ref={handleRef}
        readOnly
        onClick={openPopover}
        onClear={handleClear}
        onChange={onChange}
        adornment={{
          end: (
            <FontAwesomeIcon
              icon={faCaretDown}
              tw="transition-transform duration-300"
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
        paperProps={{ css: [tw`p-2.5 bg-blue-1 border border-solid border-blue-gray-1`] }}
        verticalSpace={8}
      >
        <ul
          className="scroll-y"
          tw="w-full max-h-32 all:(inline-block text-blue-gray-3 w-full h-10 py-2 px-3 my-1 rounded hover:(bg-blue-2 cursor-pointer))"
        >
          {options.map(option => (
            <li key={`option-${option.key}`} onClick={() => handleClick(option)}>
              {option.value}
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  )
})

export default Select
