import { DOMAttributes } from 'react'

// components
import FloatMenuItem from '@/components/layout/sidebar/menuItem/floatMenuItem'
import StaticMenuItem from '@/components/layout/sidebar/menuItem/staticMenuItem'

// contexts
import { useSidebarContext } from '@/components/layout/sidebar/context'

// types
import { ConstantsSidebarMenuType } from '@/types/components/sidebar'

export interface MenuItemProps
  extends Omit<ConstantsSidebarMenuType, 'children'>,
    DOMAttributes<HTMLDivElement> {
  isFirstChild?: boolean
}

const MenuItem = (props: MenuItemProps) => {
  const { isFirstChild = false } = props
  const { isFloat } = useSidebarContext()
  const isFirstChildFloat = isFirstChild && isFloat

  return isFirstChildFloat ? <FloatMenuItem {...props} /> : <StaticMenuItem {...props} />
}

export default MenuItem
