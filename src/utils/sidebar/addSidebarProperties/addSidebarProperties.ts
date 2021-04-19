// types
import { BASIC_SIDEBAR_MENU_TYPE, SIDEBAR_MENU_TYPE } from '@/types/sidebar'

function addSidebarProperties(
  nodes: Array<BASIC_SIDEBAR_MENU_TYPE>,
  activeNodeKey: string,
  previousKey = ''
): Array<SIDEBAR_MENU_TYPE> {
  return nodes.map(
    (node, index): SIDEBAR_MENU_TYPE => {
      // Key 有設置邏輯，子層必須是父層的 key 延伸，為了達成父層關閉而子層也關閉的功能
      const currentKey = previousKey ? `${previousKey}-${index.toString()}` : index.toString()
      const { children, ...restNode } = node
      // 只要前綴一樣就打開，因為是子層
      const isOpen = Boolean(
        activeNodeKey.length >= currentKey.length &&
          new RegExp(`^${currentKey}`).test(activeNodeKey)
      )
      // 完全一樣才是目前的
      const isActive = activeNodeKey === currentKey
      if (children) {
        const newChildren = addSidebarProperties(children, activeNodeKey, currentKey)
        return { ...node, isActive, isOpen, key: currentKey, children: newChildren }
      }

      return { ...restNode, isActive, isOpen, key: currentKey }
    }
  )
}

export default addSidebarProperties
