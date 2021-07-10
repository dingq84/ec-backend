/**
 * @author Ding.Chen 2021-06-21
 * 建立一個文字欄位，做為專案輸入匡的通用樣式，並提供 adornment 傳入，可應用在 select、date picker 等 components 裡面
 *
 * @modified
 * [Ding.Chen-2021-06-23]: 修改 start adornment 和 input 的 html 結構，為了達成 multiple select 數量過多時的 UI 呈現
 */

import { ChangeEvent, HTMLAttributes, forwardRef, useState, Ref } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import Fade from '@/components/shared/fade'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

interface basicType
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onClear' | 'id' | 'label'> {
  type?: 'text' | 'password'
  value?: string
  name?: string
  error?: boolean // 判斷是否有錯誤，每個錯誤不一定需要錯誤訊息
  errorMessage?: string // 錯誤訊息
  adornment?: {
    start?: JSX.Element
    end?: JSX.Element
  }
  clear?: boolean // 預設有 x 按鈕
  border?: boolean // 預設有 border
  disabled?: boolean
  readOnly?: boolean
  inputRef?: Ref<HTMLInputElement> // 掛載在 input 上面的 ref
  labelPosition?: 'top' | 'left' // label 在 input 的上方或是下方，預設上方
  onChange?: (value: string) => void
  onClear?: () => void
}

interface WithIdLabel extends basicType {
  id: string
  label: string
}
interface WithoutIdLabel extends basicType {
  id?: string
  label?: undefined
}

export type TextFieldProps = WithIdLabel | WithoutIdLabel

const TextField: React.ForwardRefRenderFunction<HTMLDivElement, TextFieldProps> = (
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
    inputRef,
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
    <div className={className} ref={ref}>
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
          tw="border border-solid border-blue-1 py-1 px-2 text-sm rounded flex items-center space-x-1"
          css={[
            error && tw`border-red-500`,
            disabled && tw`bg-gray-1 text-black`,
            border === false && `border-none`
          ]}
        >
          {/* 針對 start adornment 和 input 包起來，讓他可以有 wrap 的樣子，end adornment 和 clear button 維持垂直置中 */}
          <div tw="flex items-center flex-grow flex-wrap space-x-1 space-y-1">
            {adornment.start}
            <input
              tw="color[inherit] border-none flex-grow placeholder:(text-xs)"
              id={id}
              value={value}
              onChange={handleChange}
              ref={inputRef}
              disabled={disabled}
              css={[disabled && tw`cursor-not-allowed`]}
              {...restProps}
            />
          </div>

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
