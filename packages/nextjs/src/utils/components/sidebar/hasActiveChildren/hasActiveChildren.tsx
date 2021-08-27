// types
import { SidebarMenuType } from '@/types/components/sidebar'

function hasActiveChildren(list: SidebarMenuType[], targetPath: string): boolean {
  return list.some(item => {
    if (item.href === targetPath) {
      return true
    } else if (item.children) {
      return hasActiveChildren(item.children, targetPath)
    }

    return false
  })
}

export default hasActiveChildren
