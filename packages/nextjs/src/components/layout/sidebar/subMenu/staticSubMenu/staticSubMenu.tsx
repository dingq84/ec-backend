import { useState } from 'react'
import { useRouter } from 'next/router'
import 'twin.macro'

// components
import ChevronDown from '@/components/layout/sidebar/chevronDown'
import Collapse from '@/components/shared/collapse'
import MenuItem from '@/components/layout/sidebar/menuItem'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// types
import { SubMenuProps } from '@/components/layout/sidebar/subMenu'

// utils
import hasActiveChildren from '@/utils/components/sidebar/hasActiveChildren'

interface FloatSubMenuProps extends SubMenuProps {}

const StaticSubMenu = (props: FloatSubMenuProps) => {
  const { open, menu, ...restProps } = props
  const router = useRouter()
  const { asPath } = router
  const { children = [] } = menu
  const isActive = hasActiveChildren(children, asPath)

  const [isOpen, setIsOpen] = useState(isActive)

  useEnhancedEffect(() => {
    // 父層關閉時，一併關閉子層
    if (open === false) {
      setIsOpen(open)
    }
  }, [open])

  const handleClick = (): void => {
    setIsOpen(!isOpen)
  }

  return children.length ? (
    <>
      <MenuItem
        {...menu}
        {...restProps}
        onClick={handleClick}
        suffix={<ChevronDown isOpen={isOpen} />}
      >
        {menu.name}
      </MenuItem>
      <Collapse inProps={isOpen} appear>
        <ul tw="space-y-2">
          {children.map(item =>
            item.children ? (
              <StaticSubMenu key={item.id} menu={item} open={open} tw="-mt-4" />
            ) : (
              <MenuItem key={item.id} {...item} tw="-mt-4">
                {item.name}
              </MenuItem>
            )
          )}
        </ul>
      </Collapse>
    </>
  ) : (
    <MenuItem {...menu}>{menu.name}</MenuItem>
  )
}

export default StaticSubMenu
