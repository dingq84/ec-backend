import { ChangeEvent, forwardRef, HTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// types
import type { InputBasicType } from '@/types/components/input'

export interface CheckboxProps
  extends InputBasicType<boolean>,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  partialChecked?: boolean // 如果有子層有勾選，出現勾選一半得樣式
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  props: CheckboxProps,
  ref
) {
  const {
    id,
    label,
    onChange,
    error = false,
    disabled = false,
    labelPosition = 'left',
    value,
    partialChecked = false,
    ...restProps
  } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked)
  }

  return (
    <div
      className="flex-center"
      tw="space-x-1.5 inline-flex items-center relative"
      css={[labelPosition === 'top' && tw`flex-col space-x-0 space-y-0.5 items-start`]}
      {...restProps}
    >
      <div tw="relative font-size[0px]">
        <span
          tw="inline-block w-3 h-3 leading-none bg-transparent border border-solid border-primary rounded-sm"
          css={[
            (partialChecked || value) && tw`bg-primary`,
            error && tw`border-red-500`,
            disabled && tw`border-blue-gray-4`
          ]}
        ></span>
        <FontAwesomeIcon
          tw="w-2! h-2! text-white opacity-0 transition-opacity duration-300 absolute top-0.5 left-0.5"
          css={[(partialChecked || value) && tw`opacity-100`, disabled && tw`text-gray-1`]}
          icon={partialChecked && !value ? faMinus : faCheck}
        />
      </div>
      {label && (
        <label htmlFor={id} tw="ml-2 text-sm text-black font-normal">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        tw="absolute top-0 left-0 w-full h-full z-10 opacity-0 hover:(cursor-pointer)"
        css={[disabled && tw`hover:(cursor-not-allowed)`]}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={handleChange}
      />
    </div>
  )
})

export default Checkbox
