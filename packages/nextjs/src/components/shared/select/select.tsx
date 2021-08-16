/**
 * @author Ding.Chen 2021-06-23
 * 原本考慮使用 react-select，但目前功能不需要那麼多，
 * 因此以 textField、popover 和 tag 建立一個允許單選和多選的選單
 * TODO: 提供輸入 filter 以及 輸入時 call api，可從 textField 的 onChange 下手
 * TODO: 感覺 value 和 selected 可以更優化
 */

import { forwardRef, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Popover from '@/components/shared/popover'
import Tag from '@/components/shared/tag'
import TextField, { TextFieldProps } from '@/components/shared/textField'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useForkRef from '@/hooks/useForkRef'

// types
import type { Option } from '@/types/components/input'

export interface SelectProps {
  options: Option[]
  value?: null | Option
  onChange?: (value: Option | Option[]) => void
  multiple?: boolean
  inputProps?: TextFieldProps
}

const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(props, ref) {
  const { options, onChange, value: initialValue = '', multiple = false, inputProps = {} } = props
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('') // 顯示在 input 上
  const [selected, setSelected] = useState<Option[]>([]) // 實際控制的選項
  const inputRef = useRef<HTMLDivElement>(null)
  const handleRef = useForkRef(ref, inputRef)

  useEnhancedEffect(() => {
    if (typeof initialValue === 'object' && initialValue !== null) {
      setValue(initialValue.value)
      setSelected([initialValue])
    }
  }, [initialValue])

  useEnhancedEffect(() => {
    if (onChange) {
      const value = multiple ? selected : selected[0]
      onChange(value)
    }
  }, [selected])

  const openPopover = (): void => setIsOpen(true)

  const closePopover = (): void => setIsOpen(false)

  const handleClick = (option: Option): void => {
    const newValue = multiple ? '' : option.value
    const newSelected = multiple ? [...selected, option] : [option]

    setValue(newValue)
    setSelected(newSelected)

    closePopover()
  }

  const handleRemove = (target: Option) => {
    const newSelected = selected.filter(item => item.key !== target.key)
    setSelected(newSelected)
  }

  const handleClear = () => {
    setValue('')
    setSelected([])
  }

  return (
    <div tw="w-full">
      <TextField
        {...inputProps}
        ref={handleRef}
        readOnly
        onClick={openPopover}
        onClear={handleClear}
        adornment={{
          start: (
            <div tw="flex items-center space-x-1.5">
              {multiple
                ? selected.map(item => (
                    <Tag
                      key={`tag-${item.key}`}
                      label={item.value}
                      onClear={() => handleRemove(item)}
                    />
                  ))
                : null}
            </div>
          ),
          end: (
            <FontAwesomeIcon
              icon={faCaretDown}
              tw="transition-transform duration-300"
              css={[isOpen && tw`transform rotate-180`]}
            />
          )
        }}
        value={value}
      />
      <Popover
        open={isOpen}
        onClose={closePopover}
        anchorEl={inputRef.current!}
        paperProps={{ css: [tw`p-0`] }}
        verticalSpace={10}
      >
        <ul tw="w-full max-h-32 overflow-y-auto all:(inline-block text-black-1 w-full h-10 py-2 px-3 hover:(bg-p1 cursor-pointer))">
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
