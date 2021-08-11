// types
import { ConstantsSidebarMenuType } from '@/types/components/sidebar'

function hasActiveChildren(list: ConstantsSidebarMenuType[], targetPath: string): boolean {
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
