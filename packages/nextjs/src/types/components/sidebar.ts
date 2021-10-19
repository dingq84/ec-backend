interface SidebarMenuType {
  id: number
  prefix?: string
  name: string
  href?: string
  children?: SidebarMenuType[]
}

export type { SidebarMenuType }
