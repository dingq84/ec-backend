import tw from 'twin.macro'

// types
import type { SidebarItemProps } from '@/types/components/sidebar'

const SidebarItem: React.FC<SidebarItemProps> = (props: SidebarItemProps) => {
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
