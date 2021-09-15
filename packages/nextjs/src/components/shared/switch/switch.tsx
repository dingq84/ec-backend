import { ChangeEvent, MouseEvent } from 'react'
import tw from 'twin.macro'

export interface SwitchProps {
  value: boolean
  disabled?: boolean
  label?: string
  onChange: (value: boolean) => void
}

const Switch = (switchProps: SwitchProps) => {
  const { value, label, onChange, disabled = false } = switchProps

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked)
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
  }

  return (
    <div tw="flex items-center" onClick={handleClick}>
      <div
        tw="h-3 w-6 rounded-md relative px-0.5"
        css={[
          value && tw`bg-green-2`,
          value === false && tw`bg-red-3`,
          disabled && tw`bg-gray-1 pointer-events-none`
        ]}
      >
        <div
          tw="rounded-full w-2.5 h-2.5 bg-white shadow absolute top-1/2 left-0.5 transform -translate-y-1/2 transition-all"
          css={[value && tw`left-3`]}
        ></div>
        <input
          tw="rounded-md opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
          type="checkbox"
          checked={value}
          onChange={handleChange}
        />
      </div>
      {label ? <span tw="text-black text-xs font-normal inline-block ml-2">{label}</span> : null}
    </div>
  )
}

export default Switch
