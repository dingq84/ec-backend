/**
 * @author Dean Chen 2021-04-28
 * Checkbox 使用 svg 達到動畫的效果，但無法使用 font awesome 處理，因此額外使用 svg
 * 這邊使用寫 sass 原因為 tailwind 沒有太多 stroke 的設定，
 * 而且有一個 :checked 的變化，覺得透過 js 驅動有點笨拙，
 * 因此本 component 使用 sass 處理
 * 有 conditional 的部分才會透過 twin.macro - css 處理
 *
 * @modified
 * [Ding.Chen-2021-06-22]: 重構 checkbox，取消原本的 svg 動畫，改用較為簡單方式處理
 */

import { HTMLAttributes, ChangeEvent, useState, forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

interface basicType extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  name?: string
  value?: boolean
  onChange?: (checked: boolean) => void
  labelPosition?: 'top' | 'left'
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  readOnly?: boolean
}

interface inputTypeWithIdLabel extends basicType {
  id: string
  label: string
}
interface inputTypeWithoutIdLabel extends basicType {
  id?: string
  label?: undefined
}

export type CheckboxProps = inputTypeWithoutIdLabel | inputTypeWithIdLabel

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  props: CheckboxProps,
  ref
) {
  const {
    id,
    label,
    onChange,
    error,
    errorMessage,
    labelPosition = 'left',
    value: initialValue = false,
    disabled = false,
    ...restProps
  } = props
  const [value, setValue] = useState(initialValue)

  useEnhancedEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.checked)

    if (onChange) {
      onChange(event.target.checked)
    }
  }

  return (
    <div
      className="flex-center"
      tw="space-x-1.5 inline-flex"
      css={[labelPosition === 'top' && tw`flex-col space-x-0 space-y-0.5 items-start`]}
    >
      {label && (
        <label htmlFor={id} tw="text-sm text-black">
          {label}
        </label>
      )}
      <div tw="relative font-size[0px]">
        <span
          tw="inline-block w-4 h-4 leading-none bg-transparent border border-solid border-blue-1 rounded"
          css={[error && tw`border-red-500`]}
        ></span>
        <FontAwesomeIcon
          tw="text-xs text-primary opacity-0 transition-opacity duration-300 absolute top-0.5 left-0.5"
          css={[value && tw`opacity-100`, disabled && tw`text-gray-2`]}
          icon={faCheck}
        />
        <input
          ref={ref}
          id={id}
          tw="absolute top-0 left-0 w-4 h-4 z-10 opacity-0 hover:(cursor-pointer)"
          css={[disabled && tw`hover:(cursor-not-allowed)`]}
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={handleChange}
          {...restProps}
        />
      </div>
    </div>
  )
})

export default Checkbox
