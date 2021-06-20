/**
 * @author Ding.Chen 2021-06-20
 * FloatSidebarItem 針對 float 模式的 icon 顯示
 */
import { useRef } from 'react'
import tw from 'twin.macro'

// components
import Popover from '@/components/shared/popover'
import SidebarItems from '@/components/layout/sidebar/sidebarItems'
import SidebarItem from '@/components/layout/sidebar/sidebarItem'

// types
import { SidebarMenuType, SidebarItemProps } from '@/types/components/sidebar'

type FloatSidebarItemProps = Omit<SidebarItemProps, 'sidebarItems'> & {
  item: SidebarMenuType
}

const FloatSidebarItem = (props: FloatSidebarItemProps) => {
  const { item, toggleSidebarOpen, forwardTo } = props
  const ref = useRef<HTMLDivElement>(null)
  const { isOpen, name, key, isActive, prefix, children = [] } = item

  return (
    <div
      ref={ref}
      tw="w-full flex items-center justify-center px-3 py-2 text-lg text-gray-1 hover:(cursor-pointer bg-white-2)"
      key={name}
      css={[isActive && tw`text-green-1`]}
      onMouseEnter={() => toggleSidebarOpen(key!, isOpen)}
      onMouseLeave={() => toggleSidebarOpen(key!, isOpen)}
    >
      {prefix}
      <Popover
        anchorEl={ref.current!}
        open={isOpen || false}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        hiddenBackdrop
        horizontalSpace={45}
        paperProps={{
          css: [tw`p-0 rounded-l-none flex-col w-60 bg-white`]
        }}
      >
        <SidebarItem label={name} />
        <SidebarItems
          sidebarItems={children}
          toggleSidebarOpen={toggleSidebarOpen}
          forwardTo={forwardTo}
        />
      </Popover>
    </div>
  )
}

export default FloatSidebarItem
