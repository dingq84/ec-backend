import { Children, cloneElement } from 'react'
import tw from 'twin.macro'

// contexts
import { useSidebarContext } from '@/components/layout/sidebar/context'

interface MenuProps {
  children: any
}

const Menu = (props: MenuProps) => {
  const { children } = props
  const { isFloat } = useSidebarContext()

  return (
    <ul tw="space-y-2" css={[isFloat && tw`w-15 px-2.5`, !isFloat && tw`w-50 px-3`]}>
      {Children.map(children, child =>
        cloneElement(child, {
          isFirstChild: true
        })
      )}
    </ul>
  )
}

export default Menu
