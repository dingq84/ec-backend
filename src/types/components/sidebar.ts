import { DOMAttributes } from 'react'

type ConstantsSidebarMenuType = {
  prefix: any
  name: string
  href?: string
  children?: ConstantsSidebarMenuType[]
}

type SidebarMenuType = Omit<ConstantsSidebarMenuType, 'children'> & {
  isOpen?: boolean
  isActive?: boolean
  suffix?: any
  key?: string // 由 index 組成
  children?: SidebarMenuType[]
}

type SidebarItemsProps = {
  sidebarItems: SidebarMenuType[]
  toggleSidebarOpen: (key: string, open?: boolean) => void
  forwardTo: (href: string) => void
}

type SidebarItemProps = DOMAttributes<HTMLDivElement> & {
  label: string // link 的名稱
  prefix?: React.ReactNode // link 名稱前面的 component
  suffix?: React.ReactNode // link 名稱後面的 component
  isActive?: boolean // 現在是否在這層
}

export type { ConstantsSidebarMenuType, SidebarMenuType, SidebarItemsProps, SidebarItemProps }
