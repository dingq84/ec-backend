import { createContext, useContext } from 'react'

interface SidebarContextProps {
  isFloat: boolean
}

export const SidebarContext = createContext({} as SidebarContextProps)

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  return context
}
