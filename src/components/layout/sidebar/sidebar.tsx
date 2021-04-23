import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Collapse from '@/components/common/collapse'

// constants
import { BASIC_SIDEBAR_MENU } from '@/constants/sidebar'

// states
import { useAppSelector } from '@/states/global/hooks'

// types
import { SIDEBAR_MENU_TYPE } from '@/types/sidebar'

// utils
import addSidebarProperties from '@/utils/sidebar/addSidebarProperties'

const generateSidebarList = (
  list: Array<SIDEBAR_MENU_TYPE>,
  toggleActiveMenuItem: Function
): React.ReactNode => {
  return list.map(item => {
    const { icon, key, name, children, href, isActive, isOpen } = item

    return (
      <li key={key} onClick={(event: SyntheticEvent) => toggleActiveMenuItem(event, key)}>
        {href ? (
          <Link href={href}>
            <a
              css={[
                tw`flex items-center justify-start py-3 pr-4 text-light-blue-4 transition-all`,
                isActive &&
                  tw`bg-dark-blue-4 text-white border-l-4 border-light-blue-2 border-solid`
              ]}
              className={`pl-${key.length + 2}`}
            >
              <FontAwesomeIcon icon={icon} tw="text-xs mr-2" />
              <span tw="select-none text-sm">{name}</span>
            </a>
          </Link>
        ) : (
          <div
            css={[
              tw`flex items-center justify-start py-3 pr-4 text-light-blue-4 transition-all`,
              isActive && tw`bg-dark-blue-4 text-white border-l-4 border-light-blue-2 border-solid`
            ]}
            className={`pl-${key.length + 2}`}
          >
            <FontAwesomeIcon icon={icon} tw="text-xs mr-2" />
            <span tw=" select-none text-sm flex-grow">{name}</span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              tw="text-xs transition-transform"
              style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)' }}
            />
          </div>
        )}

        {children ? (
          <ul>
            <Collapse inProps={isOpen}>
              {generateSidebarList(children, toggleActiveMenuItem)}
            </Collapse>
          </ul>
        ) : null}
      </li>
    )
  })
}

const Sidebar: React.FC = () => {
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const [activeMenuKey, setActiveMenuKey] = useState('')
  const menuList = addSidebarProperties(BASIC_SIDEBAR_MENU, activeMenuKey)

  const toggleActiveMenuItem = (event: SyntheticEvent, itemKey?: string): void => {
    event.stopPropagation()

    if (itemKey === undefined) {
      return
    }

    if (new RegExp(`^${itemKey}`).test(activeMenuKey)) {
      let previousKey = ''
      if (itemKey.length > 1) {
        const itemKeyList = itemKey.split('-')
        itemKeyList.pop()
        previousKey = itemKeyList.join('-')
      }

      setActiveMenuKey(previousKey)
      return
    }

    setActiveMenuKey(itemKey)
  }

  return (
    <Collapse inProps={sidebarIsExtend} orientation="horizontal" tw="flex-shrink-0">
      <aside tw="bg-dark-blue-1 w-60 min-height[calc(100vh - 6rem)] md:(min-height[calc(100vh - 3rem)])">
        <ul>{generateSidebarList(menuList, toggleActiveMenuItem)}</ul>
      </aside>
    </Collapse>
  )
}

export default Sidebar
