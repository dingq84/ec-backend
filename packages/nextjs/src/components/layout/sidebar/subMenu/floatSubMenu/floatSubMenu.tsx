import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import tw, { css } from 'twin.macro'

// components
import Popover from '@/components/shared/popover'
import StaticSubMenu from '@/components/layout/sidebar/subMenu/staticSubMenu'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// types
import type { SubMenuProps } from '@/components/layout/sidebar/subMenu'

// utils
import hasActiveChildren from '@/utils/components/sidebar/hasActiveChildren'

interface FloatSubMenuProps extends SubMenuProps {}

const shrinkActiveGradient = css`
  & {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 135%);
  }
`

const FloatSubMenu = (props: FloatSubMenuProps) => {
  const { menu, open = false, ...restProps } = props
  const { prefix, children = [], name } = menu
  const router = useRouter()
  const { asPath } = router
  const isActive = hasActiveChildren(children, asPath)
  const [isOpen, setIsOpen] = useState(open)
  const ref = useRef<HTMLLIElement>(null!)

  useEnhancedEffect(() => {
    // 父層關閉時，一併關閉子層
    if (open === false) {
      setIsOpen(open)
    }
  }, [open])

  const handleMouseEnter = (): void => {
    setIsOpen(true)
  }

  const handleMouseLeave = (): void => {
    setIsOpen(false)
  }

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tw="w-full list-none mt-3.5"
    >
      <div
        tw="text-b0 hover:(cursor-pointer)"
        css={[isOpen && tw`cursor-pointer bg-purple-1`]}
        {...restProps}
      >
        {prefix ? (
          <span
            tw="text-lg color[inherit] inline-flex w-10 h-10 justify-center items-center cursor-pointer rounded-lg"
            css={[isActive && shrinkActiveGradient]}
          >
            {prefix}
          </span>
        ) : null}
      </div>

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
        <div tw="w-full ml-5 bg-db2 rounded py-2 px-4 relative">
          <FontAwesomeIcon icon={faCaretLeft} tw="text-3xl absolute text-db2 -left-2.5 top-2" />
          <span tw="text-b0 leading-none text-base w-full px-2 py-4 hover:(cursor-pointer)">
            {name}
          </span>
          {children.length
            ? children.map(child => <StaticSubMenu key={child.id} menu={child} tw="text-sm" />)
            : null}
        </div>
      </Popover>
    </li>
  )
}

export default FloatSubMenu
