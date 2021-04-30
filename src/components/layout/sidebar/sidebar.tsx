/**
 * @author Dean Chen 2021-04-27
 * Sidebar 完成基本的 menu tree 顯示，並加上桌機版時，可縮小 sidebar 變成 hover 效果
 * TODO: 需新增判斷 route path，找出目前的路徑
 */

import { useRouter } from 'next/router'
import { SyntheticEvent, useState, useRef, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Collapse from '@/components/common/collapse'
import Popover from '@/components/common/popover'

// constants
import { BASIC_SIDEBAR_MENU } from '@/constants/sidebar'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useIsMobile from '@/hooks/useIsMobile'

// states
import { useAppSelector } from '@/states/global/hooks'

// types
import { SIDEBAR_MENU_TYPE } from '@/types/sidebar'

// utils
import addProperties from '@/utils/sidebar/addProperties'
import getIsOpen from '@/utils/sidebar/getIsOpen'
import getPreviousKey from '@/utils/sidebar/getPreviousKey'

type SidebarItemProps = {
  item: SIDEBAR_MENU_TYPE
  toggleActiveMenuItem: Function
  isFloat: boolean
}

const SidebarItem = (props: SidebarItemProps) => {
  const anchorEl = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { item, toggleActiveMenuItem, isFloat } = props
  const { isOpen, key, name, icon, isActive, href, children, level } = item
  const isFirstLevel = level === 1
  const isFirstLevelAndFloat = isFloat && isFirstLevel
  const isFirstLevelAndOpen = isOpen && isFirstLevel
  const hasChildren = Boolean(children)

  let Transition: any = Collapse
  let transitionProps: Object = { inProps: isOpen }
  if (isFirstLevelAndFloat) {
    Transition = Popover
    transitionProps = {
      ...transitionProps,
      anchorEl: anchorEl.current,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'top'
      },
      hiddenBackdrop: true,
      horizontalSpace: 48,
      paperProps: {
        css: [tw`p-0 bg-dark-blue-1 rounded-l-none flex-col w-60`]
      }
    }
  }

  const getLiProps = () => {
    if (isFirstLevelAndFloat) {
      return {
        onMouseEnter(event: SyntheticEvent) {
          toggleActiveMenuItem(event, key)
        },
        onMouseLeave(event: SyntheticEvent) {
          toggleActiveMenuItem(event, '')
        }
      }
    }

    return {
      onClick(event: SyntheticEvent) {
        toggleActiveMenuItem(event, key)

        if (href) {
          router.push(href)
        }
      }
    }
  }

  return (
    <li
      {...getLiProps()}
      css={[
        tw`text-light-blue-4 text-sm cursor-pointer`,
        isFirstLevel === false && tw`bg-dark-blue-5 text-light-blue-1`
      ]}
    >
      <div
        ref={anchorEl}
        className={`flex items-center justify-start py-3 pr-4 transition-all pl-${key.length + 2}`}
        css={[
          href && isActive && tw`text-white`,
          isFirstLevelAndOpen &&
            tw`bg-dark-blue-4 border-l-4 border-light-blue-2 border-solid text-white`
        ]}
      >
        {icon ? (
          <FontAwesomeIcon
            icon={icon}
            className={`${isFirstLevelAndFloat ? 'text-md' : 'text-sm mr-2'}`}
          />
        ) : null}
        {isFirstLevelAndFloat ? null : (
          <>
            <span tw="select-none text-sm flex-grow">{name}</span>
            {hasChildren ? (
              <FontAwesomeIcon
                icon={faChevronLeft}
                tw="text-xs transition-transform"
                className={`transform ${isOpen ? '-rotate-90' : 'rotate-0'}`}
              />
            ) : null}
          </>
        )}
      </div>

      <Transition {...transitionProps}>
        {isFirstLevelAndFloat ? (
          <span
            css={[tw`text-light-blue-1 py-3 pr-4 text-sm w-full`, isOpen && tw`text-white`]}
            className={`flex items-center justify-start py-3 pr-4 transition-all pl-5`}
          >
            {name}
          </span>
        ) : null}
        {hasChildren ? (
          <ul tw="w-full">
            {children?.map((kid: SIDEBAR_MENU_TYPE) => (
              <SidebarItem
                key={kid.key}
                isFloat={isFloat}
                toggleActiveMenuItem={toggleActiveMenuItem}
                item={kid}
              />
            ))}
          </ul>
        ) : null}
      </Transition>
    </li>
  )
}

const Sidebar: React.FC = () => {
  const isMobile = useIsMobile()
  const [activeMenuKey, setActiveMenuKey] = useState('')
  const [menuList, setMenuList] = useState<SIDEBAR_MENU_TYPE[]>([])
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const isDesktopAndCollapsed = isMobile === false && sidebarIsExtend === false
  // TODO: 這邊有個問題，當桌機縮成 48px，螢幕尺寸變成手機時，會出現手機的縮放仍是 48px
  const collapsedSize = isMobile ? '0px' : '48px'

  // 當 activeMenuKey 更新，重新整理 menuList 的 isOpen、isActive 等 key
  useEnhancedEffect(() => {
    setMenuList(addProperties(BASIC_SIDEBAR_MENU, activeMenuKey))
  }, [activeMenuKey])

  // reset active key
  useEnhancedEffect(() => {
    setActiveMenuKey('')
  }, [sidebarIsExtend])

  const toggleActiveMenuItem = useCallback(
    (event: SyntheticEvent, itemKey: string): void => {
      event.stopPropagation()

      let newActiveMenuKey: string = itemKey
      if (getIsOpen(itemKey, activeMenuKey)) {
        newActiveMenuKey = getPreviousKey(itemKey)
      }

      setActiveMenuKey(newActiveMenuKey)
    },
    [activeMenuKey]
  )

  return (
    <Collapse
      inProps={sidebarIsExtend}
      orientation="horizontal"
      tw="flex-shrink-0"
      collapsedSize={collapsedSize}
      timeout={100}
    >
      <aside tw="bg-dark-blue-1 w-60 min-height[calc(100vh - 6rem)] md:(min-height[calc(100vh - 3rem)])">
        <ul>
          {menuList.map(item => (
            <SidebarItem
              key={item.key}
              item={item}
              isFloat={isDesktopAndCollapsed}
              toggleActiveMenuItem={toggleActiveMenuItem}
            />
          ))}
        </ul>
      </aside>
    </Collapse>
  )
}

export default Sidebar
