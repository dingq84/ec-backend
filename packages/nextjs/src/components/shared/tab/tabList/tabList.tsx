import { cloneElement, Children } from 'react'
import 'twin.macro'

interface TabListProps {
  children: any
}

const TabList = (props: TabListProps) => {
  const { children } = props

  return (
    <div tw="flex justify-start items-center border-b-2 border-solid border-gray-1">
      {Children.map(children, (child, index) => {
        if (child.type.name !== 'Tab') {
          return child
        }

        return cloneElement(child, {
          index
        })
      })}
    </div>
  )
}

export default TabList
