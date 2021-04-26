import { useRouter } from 'next/router'
import { SyntheticEvent, useState, useRef } from 'react'
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
        horizontal: 'right',
        vertical: 'top'
      },

      horizontalSpace: 10,
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
        <FontAwesomeIcon
          icon={icon}
          className={`${isFirstLevelAndFloat ? 'text-md' : 'text-sm mr-2'}`}
        />
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
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const [activeMenuKey, setActiveMenuKey] = useState('')
  const isMobile = useIsMobile()
  const isDesktopAndCollapsed = isMobile === false && sidebarIsExtend === false
  const menuList = addProperties(BASIC_SIDEBAR_MENU, activeMenuKey)

  useEnhancedEffect(() => {
    // reset active key
    setActiveMenuKey('')
  }, [sidebarIsExtend])

  const toggleActiveMenuItem = (event: SyntheticEvent, itemKey: string): void => {
    event.stopPropagation()

    let newActiveMenuKey: string = itemKey
    if (getIsOpen(itemKey, activeMenuKey)) {
      newActiveMenuKey = getPreviousKey(itemKey)
    }

    setActiveMenuKey(newActiveMenuKey)
  }

  return (
    <Collapse
      inProps={sidebarIsExtend}
      orientation="horizontal"
      tw="flex-shrink-0"
      collapsedSize={isMobile ? '0px' : '48px'}
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
