import { DOMAttributes } from 'react'
import tw from 'twin.macro'

export type SidebarItemProps = DOMAttributes<HTMLDivElement> & {
  label: string // link 的名稱
  prefix?: React.ReactNode // link 名稱前面的 component
  suffix?: React.ReactNode // link 名稱後面的 component
  isActive?: boolean // 現在是否在這層
}

const SidebarItem = (props: SidebarItemProps) => {
  const { label, prefix, suffix, isActive = false, ...restProps } = props
  return (
    <div
      tw="w-full flex text-blue-2 justify-start text-sm items-center px-3 py-2 hover:(cursor-pointer bg-purple-1)"
      {...restProps}
    >
      {prefix ? <div tw="mr-3 color[inherit]">{prefix}</div> : null}
      <span
        tw="color[inherit] select-none leading-none text-base"
        css={[isActive && tw`text-primary`]}
      >
        {label}
      </span>
      {suffix ? <div tw="ml-auto color[inherit]">{suffix}</div> : null}
    </div>
  )
}

export default SidebarItem
