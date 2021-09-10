import { ChangeEvent, InputHTMLAttributes } from 'react'
import tw from 'twin.macro'

export interface RadioProps<T extends InputHTMLAttributes<HTMLInputElement>['value'] = undefined> {
  checked: boolean
  onChange: (checked: string) => void
  label?: string
  disabled?: boolean
  value?: T
}

const Radio = <T extends InputHTMLAttributes<HTMLInputElement>['value'] = undefined>(
  props: RadioProps<T>
) => {
  const { checked, onChange, label, value, disabled = false } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value)
  }

  return (
    <div tw="flex items-center relative">
      <div
        tw="relative border-2 border-solid border-blue-2 rounded-full w-4.5 h-4.5"
        css={[checked && tw`border-primary`, disabled && tw`border-blue-gray-4`]}
      >
        <div
          tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded opacity-0 transition-opacity duration-300"
          css={[
            checked && tw`bg-primary opacity-100`,
            checked && disabled && tw`bg-blue-gray-4 opacity-100`
          ]}
        ></div>
      </div>

      {label ? <span tw="inline-block ml-2 text-black font-normal text-sm">{label}</span> : null}

      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        tw="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
        value={value}
      />
    </div>
  )
}

export default Radio
