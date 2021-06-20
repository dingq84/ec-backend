/**
 * @author Dean Chen 2021-04-27
 * Sidebar 完成基本的 menu tree 顯示，並加上桌機版時，可縮小 sidebar 變成 hover 效果
 *
 * @modified
 * [Dean Chen 2021-06-17]: 重構
 * Features
 * 1. 預設全展開或全收和
 * 2. 有 collapse 和 popup 兩種形式
 * 3. 只渲染出目前層的下一層，在下去的不渲染
 * 4. 判斷目前在哪個 link，需有樣式，在 popup 時，該 link 的最根層需有樣式
 * 5. 如果是全收和狀態，需展開目前的那個 link
 */

import { useState } from 'react'
import { useRouter } from 'next/router'
import 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import FloatSidebarItem from '@/components/layout/sidebar/floatSidebarItem'
import SidebarItems from '@/components/layout/sidebar/sidebarItems'

// constants
import SIDEBAR_MENU from '@/constants/components/sidebar'

// hooks
import useIsMobile from '@/hooks/useIsMobile'
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// states
import { useAppSelector } from '@/states/global/hooks'

// types
import { SidebarMenuType } from '@/types/components/sidebar'

// utils
import findRouteIndex from '@/utils/components/sidebar/findRouteIndex'
import addProperties from '@/utils/components/sidebar/addProperties'

const Sidebar: React.FC = () => {
  const router = useRouter()
  const { asPath } = router
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const isMobile = useIsMobile()
  // 手機版完全收合起來，桌機會保留 icon 的寬度
  const collapsedSize = isMobile ? '0px' : '48px'
  // 只有桌機版的收合模式為 float
  const isFloat = isMobile === false && sidebarIsExtend === false
  // 目前停留的 sidebar item index
  const activeRouteIndex = findRouteIndex(SIDEBAR_MENU, asPath)
  const [sidebarItems, setSidebarItems] = useState<SidebarMenuType[]>([])

  useEnhancedEffect(() => {
    setSidebarItems(
      addProperties({
        sidebarMenu: SIDEBAR_MENU,
        targetRouteIndex: activeRouteIndex,
        plugins: {
          open: !isFloat,
          active: true
        }
      })
    )
  }, [isFloat])

  const toggleSidebarOpen = (key: string, open: boolean = false): void => {
    setSidebarItems(
      addProperties({
        sidebarMenu: sidebarItems,
        targetRouteIndex: !open ? key : key.slice(0, key.length - 1),
        plugins: {
          open: true
        }
      })
    )
  }

  const forwardTo = (href: string): void => {
    router.push(href)
  }

  return (
    <Collapse
      inProps={sidebarIsExtend}
      orientation="horizontal"
      tw="flex-shrink-0"
      collapsedSize={collapsedSize}
    >
      {isFloat ? (
        <div>
          {sidebarItems.map(sidebar => (
            <FloatSidebarItem
              key={sidebar.name}
              item={sidebar}
              toggleSidebarOpen={toggleSidebarOpen}
              forwardTo={forwardTo}
            />
          ))}
        </div>
      ) : (
        <div tw="w-60">
          <SidebarItems
            sidebarItems={sidebarItems}
            toggleSidebarOpen={toggleSidebarOpen}
            forwardTo={forwardTo}
          />
        </div>
      )}
    </Collapse>
  )
}

export default Sidebar
