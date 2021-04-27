/**
 * @author Dean Chen 2021-04-17
 * Header 從首頁中拉出來，主要顯示使用者訊息已經 Sidebar 的控制，
 * 屬於 Default layout 的一個 component，所以放在 layout 底下
 */

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/client'
import tw, { styled } from 'twin.macro'

// components
import Popover from '@/components/common/popover'

// hooks
import useIsMobile from '@/hooks/useIsMobile'

// states
import { toggleSidebar, setSidebar } from '@/states/global/settings'
import { useAppSelector, useAppDispatch } from '@/states/global/hooks'

const StyledSpan = styled.span`
  ${tw`px-4 text-sm text-center h-12 block leading-12 hover:(bg-light-blue-3 cursor-pointer)`}
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
          tw="transition-width duration-500 block w-full h-12 leading-12 text-center font-size[1.25rem] bg-light-blue-3 text-white"
          css={[isDesktopAndCollapsed ? tw`md:w-12` : tw`md:w-60`]}
          data-testid="logo"
        >
          <span tw="font-light">
            {isDesktopAndCollapsed ? (
              <b>ALT</b>
            ) : (
              <>
                <b>Admin</b>LTE
              </>
            )}
          </span>
        </a>
      </Link>
      <nav tw="flex justify-between text-white bg-light-blue-2 flex-grow">
        <StyledSpan tw="w-11" onClick={() => dispatch(toggleSidebar())} data-testid="menu">
          <FontAwesomeIcon icon={faBars} />
        </StyledSpan>
        <div>
          <ul tw="flex items-stretch">
            <li>
              <div ref={anchorEl} onClick={() => togglePopover(true)} data-testid="functions">
                <StyledSpan>Alexander Pierce</StyledSpan>
              </div>
            </li>
            <li>
              <StyledSpan>
                <FontAwesomeIcon icon={faCogs} />
              </StyledSpan>
            </li>
          </ul>
        </div>
      </nav>
      <Popover
        anchorEl={anchorEl.current!}
        inProps={popoverIsOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        horizontalSpace={5}
        onClose={() => togglePopover(false)}
        paperProps={{ css: [tw`w-auto px-0 py-0`] }}
      >
        <ul tw="all:(text-dark-blue-2 w-32 py-2 text-sm select-none text-center cursor-pointer hocus:(bg-dark-gray-1 text-gray-100))">
          <li onClick={() => signOut()}>Sign out</li>
        </ul>
      </Popover>
    </header>
  )
}

export default Header
