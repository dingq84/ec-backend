import { useState, cloneElement, Children } from 'react'

// context
import { TabContext } from '@/components/shared/tab/useTabContext'

interface TabsProps {
  activeIndex?: number
  children: any
}

const Tabs = (props: TabsProps) => {
  const { children, activeIndex: propsActiveIndex = 0 } = props
  const [activeIndex, setActiveIndex] = useState(propsActiveIndex)

  const updateActiveIndex = (activeIndex: number): void => {
    setActiveIndex(activeIndex)
  }

  return (
    <TabContext.Provider value={{ activeIndex, updateActiveIndex }}>
      {Children.map(children, (child, arrayIndex) => {
        if (arrayIndex === 0) {
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
