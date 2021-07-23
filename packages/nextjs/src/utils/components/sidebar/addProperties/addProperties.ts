import produce from 'immer'

// utils
import getIsOpen from '@/utils/components/sidebar/getIsOpen'
import getIsActive from '@/utils/components/sidebar/getIsActive'

// types
import { ConstantsSidebarMenuType, SidebarMenuType } from '@/types/components/sidebar'

type AppendPropertyType = {
  sidebarMenu: Array<ConstantsSidebarMenuType | SidebarMenuType>
  targetRouteIndex: string
  parentIndex?: string
  // 決定新增 route 的 property 有哪些，目前有 isOpen、isActive
  plugins: {
    open?: boolean
    active?: boolean
  }
}

function appendProperties(props: AppendPropertyType): SidebarMenuType[] {
  const { sidebarMenu, targetRouteIndex, parentIndex = '', plugins } = props
  const { open, active } = plugins

  return sidebarMenu.map((sidebar, index) => {
    return produce<SidebarMenuType>(sidebar, draft => {
      const mixedIndex = `${parentIndex}${index}`
      draft.key = mixedIndex

      if (open) {
        const isOpen = getIsOpen(mixedIndex, targetRouteIndex)
        const { children } = sidebar
        draft.isOpen = isOpen

        if (children) {
          // 根據 isOpen 是 true，就繼續判斷子層的 open 和 active，
          // 反之移除下一層子層的 isOpen 和 isActive，避免收合超過兩層再打開時出現舊的子層
          draft.children = appendProperties({
            sidebarMenu: children,
            targetRouteIndex,
            parentIndex: mixedIndex,
            plugins: isOpen ? plugins : {}
          }) as SidebarMenuType[]
        }
      } else {
        delete draft.isOpen
      }

      if (active) {
        draft.isActive = getIsActive(mixedIndex, targetRouteIndex)
      }
    })
  })
}

export default appendProperties
