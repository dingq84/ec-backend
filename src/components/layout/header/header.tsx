/**
 * @author Dean Chen 2021-04-17
 * Header 從首頁中拉出來，主要顯示使用者訊息已經 Sidebar 的控制，
 * 屬於 Default layout 的一個 component，所以放在 layout 底下
 */

import Link from 'next/link'
import { memo, useCallback, useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/client'
import tw, { styled } from 'twin.macro'

// components
import Popover from '@/components/common/popover'

// hooks
import useIsMobile from '@/hooks/useIsMobile'

// states
import { useAppDispatch } from '@/states/global/hooks'
import { toggleSidebar, setSidebar } from '@/states/global/settings'

const StyledSpan = styled.span`
  ${tw`px-4 text-sm text-center h-12 block leading-12 hover:(bg-light-blue-3 cursor-pointer)`}
`

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const anchorEl = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    dispatch(setSidebar(!isMobile))
  }, [isMobile])

  const togglePopover = (isOpen: boolean): void => {
    setPopoverIsOpen(isOpen)
  }

  return (
    <header tw="relative">
      <Link href="/">
        <a tw="transition-width duration-300 block w-full h-12 leading-12 text-center font-size[1.25rem] bg-light-blue-3 text-white md:(float-left w-60)">
          <span tw="font-light">
            <b>Admin</b>LTE
          </span>
        </a>
      </Link>
      <nav tw="flex justify-between duration-300 text-white bg-light-blue-2 md:(ml-60)">
        <StyledSpan tw="w-11" onClick={() => dispatch(toggleSidebar())} data-testid="menu">
          <FontAwesomeIcon icon={faBars} />
        </StyledSpan>
        <div>
          <ul tw="flex items-stretch">
            <li>
              <div ref={anchorEl} onClick={() => togglePopover(true)}>
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
        horizontalSpace={10}
        onClose={() => togglePopover(false)}
        paperProps={{ css: [tw`w-auto px-0 py-0`] }}
      >
        <ul>
          <li
            tw="text-dark-blue-2 px-8 py-2 text-sm select-none cursor-pointer hocus:(bg-dark-gray-1 text-gray-100)"
            onClick={() => signOut()}
          >
            Sign out
          </li>
        </ul>
      </Popover>
    </header>
  )
}

// To avoid re-render after updating redux state
export default memo(Header)
