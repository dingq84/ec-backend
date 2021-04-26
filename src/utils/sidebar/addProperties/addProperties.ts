/**
 * @author Dean Chen 2021-04-26
 * addSidebarProperties 主要是替 sidebar 的設定檔新增後續會使用的屬性，
 * 像是 key、isOpen、isActive，其中的邏輯都抽到各個 function，這邊僅作遞迴操作
 */

// types
import { BASIC_SIDEBAR_MENU_TYPE, SIDEBAR_MENU_TYPE } from '@/types/sidebar'

// utils
import getIsActive from '@/utils/sidebar/getIsActive'
import getIsOpen from '@/utils/sidebar/getIsOpen'
import getKey from '@/utils/sidebar/getKey'

function addSidebarProperties(
  nodes: Array<BASIC_SIDEBAR_MENU_TYPE>,
  activeNodeKey: string,
  previousKey = '',
  level = 1
): Array<SIDEBAR_MENU_TYPE> {
  return nodes.map(
    (node, index): SIDEBAR_MENU_TYPE => {
      const key = getKey(previousKey, index.toString())
      const isOpen = getIsOpen(key, activeNodeKey)
      const isActive = getIsActive(key, activeNodeKey)
      const { children, ...restNode } = node

      if (children) {
        return {
          ...node,
          isActive,
          isOpen,
          key,
          level,
          children: addSidebarProperties(children, activeNodeKey, key, level + 1)
        }
      }

      return { ...restNode, isActive, isOpen, key, level }
    }
  )
}

export default addSidebarProperties
