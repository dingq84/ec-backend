/**
 * @author Dean Chen 2021-04-17
 * Header 從首頁中拉出來，主要顯示使用者訊息已經 Sidebar 的控制，
 * 屬於 Default layout 的一個 component，所以放在 layout 底下
 */

import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Popover from '@/components/shared/popover'

// core
import core from '@ec-backend/core/src'

// states
import { clearMe } from '@/states/global/me'
import { useAppSelector, useAppDispatch } from '@/states/global/hooks'
import { isRight } from 'fp-ts/lib/Either'

const Header = () => {
  const anchorEl = useRef<HTMLDivElement>(null!)
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.me.user)

  const togglePopover = (isOpen: boolean): void => {
    setPopoverIsOpen(isOpen)
  }

  const logOut = async () => {
    const result = await core.auth.token.logout()
    if (isRight(result)) {
      dispatch(clearMe())
      router.push('/auth/login')
    }
  }

  return (
    <header tw="relative bg-blue-1 flex flex-col md:flex-row">
      <nav tw="flex justify-between text-black flex-grow pr-3">
        <div
          ref={anchorEl}
          tw="text-gray-3 hover:(opacity-70)"
          data-testid="functions"
          className="flex-center"
          onClick={() => togglePopover(true)}
        >
          <button tw="px-4 color[inherit]">{user?.name || ''}</button>
          <FontAwesomeIcon
            icon={faChevronDown}
            tw="text-sm transition-transform duration-300 color[inherit]"
            css={[popoverIsOpen && tw`transform rotate-180`]}
          />
        </div>
      </nav>
      <Popover
        horizontalSpace={5}
        open={popoverIsOpen}
        anchorEl={anchorEl.current}
        onClose={() => togglePopover(false)}
        paperProps={{ css: [tw`w-auto px-0 py-0 shadow-xl`] }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <ul tw="all:(py-1.5 inline-block)">
          <li>
            <span className="text-black">個人資訊</span>
          </li>
          <li onClick={logOut}>
            <span className="text-black">登出</span>
          </li>
        </ul>
      </Popover>
    </header>
  )
}

export default Header
