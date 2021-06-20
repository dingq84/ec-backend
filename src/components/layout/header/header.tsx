/**
 * @author Dean Chen 2021-04-17
 * Header 從首頁中拉出來，主要顯示使用者訊息已經 Sidebar 的控制，
 * 屬於 Default layout 的一個 component，所以放在 layout 底下
 */

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import tw, { styled } from 'twin.macro'

// components
import Image from '@/components/shared/image'
import Popover from '@/components/shared/popover'

// hooks
import useIsMobile from '@/hooks/useIsMobile'

// states
import { toggleSidebar, setSidebar } from '@/states/global/settings'
import { useAppSelector, useAppDispatch } from '@/states/global/hooks'

const StyledSpan = styled.span`
  ${tw`px-4 text-sm text-center h-12 block leading-12 hover:(cursor-pointer)`}
`

const Header: React.FC = () => {
  const isMobile = useIsMobile()
  const anchorEl = useRef<HTMLDivElement>(null)
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const isDesktopAndCollapsed = isMobile === false && sidebarIsExtend === false

  useEffect(() => {
    dispatch(setSidebar(!isMobile))
  }, [isMobile])

  const togglePopover = (isOpen: boolean): void => {
    setPopoverIsOpen(isOpen)
  }

  return (
    <header tw="relative flex flex-col md:flex-row">
      <Link href="/">
        <a
          tw="transition-width duration-300 flex items-center justify-center h-12 bg-gray-5"
          css={[isDesktopAndCollapsed ? tw`md:w-12` : tw`md:w-60`]}
          data-testid="logo"
        >
          <Image
            src={isDesktopAndCollapsed ? 'icons/logo-small.png' : 'icons/logo.png'}
            alt="logo image"
          />
        </a>
      </Link>
      <nav tw="flex justify-between text-gray-1 bg-gray-6 flex-grow pr-3">
        <StyledSpan tw="w-11" onClick={() => dispatch(toggleSidebar())} data-testid="menu">
          <FontAwesomeIcon icon={faBars} />
        </StyledSpan>
        <div
          ref={anchorEl}
          onClick={() => togglePopover(true)}
          data-testid="functions"
          tw="flex items-center"
        >
          <StyledSpan>Alexander Pierce</StyledSpan>
          <FontAwesomeIcon
            icon={faChevronDown}
            tw="text-sm transition-transform duration-300"
            css={[popoverIsOpen && tw`transform rotate-180`]}
          />
        </div>
      </nav>
      <Popover
        anchorEl={anchorEl.current!}
        open={popoverIsOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        horizontalSpace={5}
        onClose={() => togglePopover(false)}
        paperProps={{ css: [tw`w-auto px-0 py-0`] }}
      >
        <ul tw="all:(w-32 py-1 inline-block)">
          <li>
            <Link href="/auth/login">
              <a>Sign out</a>
            </Link>
          </li>
        </ul>
      </Popover>
    </header>
  )
}

export default Header
