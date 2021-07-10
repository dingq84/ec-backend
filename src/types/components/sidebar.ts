interface ConstantsSidebarMenuType {
  prefix: any
  name: string
  href?: string
  children?: ConstantsSidebarMenuType[]
}

interface SidebarMenuType extends Omit<ConstantsSidebarMenuType, 'children'> {
  isOpen?: boolean
  isActive?: boolean
  suffix?: any
  key?: string // 由 index 組成
  children?: SidebarMenuType[]
}

interface SidebarItemsProps {
  sidebarItems: SidebarMenuType[]
  toggleSidebarOpen: (key: string, open?: boolean) => void
  forwardTo: (href: string) => void
}

export type { ConstantsSidebarMenuType, SidebarMenuType, SidebarItemsProps }
