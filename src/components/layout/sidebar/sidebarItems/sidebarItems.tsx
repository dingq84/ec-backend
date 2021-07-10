import { Fragment } from 'react'
import { produce } from 'immer'
import 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import ChevronDown from '@/components/layout/sidebar/chevronDown'
import SidebarItem from '@/components/layout/sidebar/sidebarItem'

// types
import type { SidebarItemsProps } from '@/types/components/sidebar'
import type { SidebarItemProps } from '@/components/layout/sidebar/sidebarItem'

const SidebarItems = (props: SidebarItemsProps) => {
  const { sidebarItems, toggleSidebarOpen, forwardTo } = props
  return (
    <>
      {sidebarItems.map(item => {
        const { isOpen, name, key, href, children = [], ...restProps } = item
        const childProps = produce(restProps as SidebarItemProps, draft => {
          draft.label = name
          if (children.length) {
            draft.suffix = <ChevronDown isOpen={isOpen || false} />
            draft.onClick = () => toggleSidebarOpen(key!, isOpen)
          } else {
            draft.onClick = () => forwardTo(href!)
          }
        })

        // 渲染到擁有 isOpen 的下一層
        if (isOpen !== undefined) {
          return (
            <Fragment key={name}>
              <SidebarItem {...childProps} />
              <Collapse inProps={isOpen} tw="ml-2">
                <SidebarItems {...props} sidebarItems={children} />
              </Collapse>
            </Fragment>
          )
        }

        return <SidebarItem key={name} {...childProps} />
      })}
    </>
  )
}

export default SidebarItems
