import { useState, cloneElement, Children } from 'react'

// context
import { TabContext } from '@/components/shared/tab/useTabContext'

interface TabsProps {
  children: any
}

const Tabs = (props: TabsProps) => {
  const { children } = props
  const [activeIndex, setActiveIndex] = useState(0)

  const updateActiveIndex = (activeIndex: number): void => {
    setActiveIndex(activeIndex)
  }

  return (
    <TabContext.Provider value={{ activeIndex, updateActiveIndex }}>
      {Children.map(children, (child, arrayIndex) => {
        if (child.type.name !== 'TabPanel') {
          return child
        }
        return cloneElement(child, {
          index: arrayIndex - 1
        })
      })}
    </TabContext.Provider>
  )
}

export default Tabs
