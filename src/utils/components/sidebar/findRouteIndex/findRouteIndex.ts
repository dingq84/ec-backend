/**
 * @author Ding.Chen 2021-06-18
 * 建立一個 util 根據目前的 route 找尋出目前是哪一個 sidebar item，
 * 回傳格式為字串，如: '010'，表示在第零個的 children 中的第二個的 children 的第一個
 * [
 *    {
 *      children: [
 *        {},
 *        {
 *           children: [
 *             {
 *                href: 'active
 *             }
 *           ]
 *        }
 *      ]
 *    }
 * ]
 */

// types
import { ConstantsSidebarMenuType } from '@/types/components/sidebar'

function findRouteIndex(sidebarMenu: ConstantsSidebarMenuType[], target: string) {
  return sidebarMenu.reduce((accumulate: string, current, index: number): string => {
    // 如果 accumulate 已經有值，表示已找到 accumulate，這樣就不需再尋找
    if (accumulate) {
      return accumulate
    }

    const { children, href } = current
    if (href === target) {
      return `${accumulate}${index}`
    }

    if (children) {
      const childrenIndex = findRouteIndex(children, target)
      if (childrenIndex !== '') {
        return `${accumulate}${index}${childrenIndex}`
      }
    }

    return ''
  }, '')
}

export default findRouteIndex
