import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import tw, { css } from 'twin.macro'

// components
import Popover from '@/components/shared/popover'

// types
import { MenuItemProps } from '@/components/layout/sidebar/menuItem'

interface FloatMenuItemProps extends MenuItemProps {}

const shrinkActiveGradient = css`
  & {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 135%);
  }
`

const FloatMenuItem = (props: FloatMenuItemProps) => {
  const { prefix, suffix, isFirstChild = false, children, id, name, href, ...restProps } = props
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null!)
  const router = useRouter()
  const { asPath } = router
  const isActive = asPath === href

  const handleMouseEnter = (): void => {
    setIsOpen(true)
  }

  const handleMouseLeave = (): void => {
    setIsOpen(false)
  }

  return (
    <li ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} tw="list-none">
      <div tw="text-blue-1 hover:(cursor-pointer)" {...restProps}>
        {prefix ? (
          <span
            tw="text-lg color[inherit] inline-flex w-10 h-10 justify-center items-center cursor-pointer rounded-lg"
            css={[isActive && shrinkActiveGradient]}
          >
            {prefix}
          </span>
        ) : null}
        <Popover
          anchorEl={ref.current}
          open={isOpen}
          autoWidth={false}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top'
          }}
          hiddenBackdrop
          horizontalSpace={40}
          paperProps={{
            css: [tw`p-0 rounded-l-none w-50 bg-transparent`]
          }}
        >
          <div tw="w-full ml-5 bg-blue-7 rounded py-2 px-4 relative">
            <FontAwesomeIcon
              icon={faCaretLeft}
              tw="text-3xl absolute text-blue-7 -left-2.5 top-2"
            />
            <span tw="text-blue-1 w-full leading-none text-base hover:(cursor-pointer)">
              {children}
            </span>
          </div>
        </Popover>
      </div>
    </li>
  )
}

export default FloatMenuItem
