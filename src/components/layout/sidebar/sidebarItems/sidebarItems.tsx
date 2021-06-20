import { Fragment } from 'react'
import 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import ChevronDown from '@/components/layout/sidebar/chevronDown'
import SidebarItem from '@/components/layout/sidebar/sidebarItem'

// types
import { SidebarItemProps } from '@/types/components/sidebar'

const SidebarItems: React.FC<SidebarItemProps> = (props: SidebarItemProps) => {
  const { sidebarItems, toggleSidebarOpen, forwardTo } = props
  return (
    <>
      {sidebarItems.map(item => {
        const { isOpen, name, key, href, children = [], ...restProps } = item
        const childProps = children.length
          ? {
              ...restProps,
              suffix: <ChevronDown isOpen={isOpen || false} />,
              onClick: () => toggleSidebarOpen(key!, isOpen)
            }
          : {
              ...restProps,
              onClick: () => forwardTo(href!)
            }

        // 渲染到擁有 isOpen 的下一層
        if (isOpen !== undefined) {
          return (
            <Fragment key={name}>
              <SidebarItem label={name} {...childProps} />
              <Collapse inProps={isOpen} tw="ml-2">
                <SidebarItems {...props} sidebarItems={children} />
              </Collapse>
            </Fragment>
          )
        } else {
          return <SidebarItem key={name} label={name} {...childProps} />
        }
      })}
    </>
  )
}

export default SidebarItems
