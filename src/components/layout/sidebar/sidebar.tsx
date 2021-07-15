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
import FloatSidebarItems from '@/components/layout/sidebar/floatSidebarItems'
import SidebarItems from '@/components/layout/sidebar/sidebarItems'

// constants
import SIDEBAR_MENU from '@/constants/components/sidebar'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useIsMobile from '@/hooks/useIsMobile'

// states
import { useAppSelector } from '@/states/global/hooks'

// types
import { SidebarMenuType } from '@/types/components/sidebar'

// utils
import addProperties from '@/utils/components/sidebar/addProperties'
import findRouteIndex from '@/utils/components/sidebar/findRouteIndex'

const Sidebar: React.FC = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const [sidebarItems, setSidebarItems] = useState<SidebarMenuType[]>([])
  // 只有桌機版的收合模式為 float
  const [isFloat, setIsFloat] = useState(isMobile === false && sidebarIsExtend === false)
  // 手機版完全收合起來，桌機會保留 icon 的寬度
  const [collapsedSize, setCollapsedSize] = useState(isMobile ? '0px' : '48px')

  useEnhancedEffect(() => {
    setIsFloat(isMobile === false && sidebarIsExtend === false)
  }, [isMobile, sidebarIsExtend])

  useEnhancedEffect(() => {
    setCollapsedSize(isMobile ? '0px' : '48px')
  }, [isMobile])

  useEnhancedEffect(() => {
    setSidebarItems(
      addProperties({
        sidebarMenu: SIDEBAR_MENU,
        targetRouteIndex: findRouteIndex(SIDEBAR_MENU, router.asPath),
        plugins: {
          open: !isFloat,
          active: true
        }
      })
    )
  }, [isFloat])

  useEnhancedEffect(() => {
    function handleStart(url: string) {
      setSidebarItems(
        addProperties({
          sidebarMenu: SIDEBAR_MENU,
          targetRouteIndex: findRouteIndex(SIDEBAR_MENU, url),
          plugins: {
            open: false,
            active: true
          }
        })
      )
    }

    router.events.on('routeChangeStart', handleStart)

    return () => {
      router.events.off('routeChangeStart', handleStart)
    }
  }, [router])

  const toggleSidebarOpen = (key: string, open: boolean = false): void => {
    const targetRouteIndex = open ? key : key.slice(0, key.length - 1)
    setSidebarItems(
      addProperties({
        sidebarMenu: sidebarItems,
        targetRouteIndex,
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
      tw="flex-shrink-0 bg-white-1"
      collapsedSize={collapsedSize}
    >
      {isFloat ? (
        <div>
          {sidebarItems.map(sidebar => (
            <FloatSidebarItems
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
