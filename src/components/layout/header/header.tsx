/**
 * @author Dean Chen 2021-04-17
 * Header 從首頁中拉出來，主要顯示使用者訊息已經 Sidebar 的控制，
 * 屬於 Default layout 的一個 component，所以放在 layout 底下
 */

import Link from 'next/link'
import { memo, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons'
import tw, { styled } from 'twin.macro'

// hooks
import useResize from '@/hooks/useResize'

// states
import { useAppDispatch } from '@/states/global/hooks'
import { toggleSidebar, setSidebar } from '@/states/global/settings'

type HeaderProps = {
  className?: string
}

const StyledSpan = styled.span`
  ${tw`px-4 text-sm text-center h-12 block leading-12 hover:(bg-light-blue-3 cursor-pointer)`}
`

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className = '' } = props
  const dispatch = useAppDispatch()
  const isMobile = useResize()

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebar(false))
    } else {
      dispatch(setSidebar(true))
    }
  }, [isMobile])

  return (
    <header tw="relative z-20" className={className}>
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
              <StyledSpan>Alexander Pierce</StyledSpan>
            </li>
            <li>
              <StyledSpan>
                <FontAwesomeIcon icon={faCogs} />
              </StyledSpan>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

// To avoid re-render after updating redux state
export default memo(Header)
