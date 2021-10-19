import { createContext, useContext } from 'react'

interface InitialValue {
  activeIndex: number
  updateActiveIndex: (activeIndex: number) => void
}

const initialValue = {} as InitialValue
const TabContext = createContext(initialValue)

const useTabContext = () => {
  return useContext(TabContext)
}

export default useTabContext

export { TabContext }
