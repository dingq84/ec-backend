import { DOMAttributes } from 'react'
import 'twin.macro'

// components
import FloatSubMenu from '@/components/layout/sidebar/subMenu/floatSubMenu'
import StaticSubMenu from '@/components/layout/sidebar/subMenu/staticSubMenu'

// contexts
import { useSidebarContext } from '@/components/layout/sidebar/context'

// types
import { ConstantsSidebarMenuType } from '@/types/components/sidebar'

export interface SubMenuProps extends DOMAttributes<HTMLDivElement> {
  open?: boolean
  isFirstChild?: boolean
  menu: ConstantsSidebarMenuType
}

const SubMenu = (props: SubMenuProps) => {
  const { isFirstChild, ...restProps } = props
  const { isFloat } = useSidebarContext()
  const isFirstChildFloat = isFirstChild && isFloat

  return isFirstChildFloat ? <FloatSubMenu {...restProps} /> : <StaticSubMenu {...restProps} />
}

export default SubMenu
