import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'

// contexts
import { SidebarContext } from '../context'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useIsMobile from '@/hooks/useIsMobile'

// states
import { useAppDispatch, useAppSelector } from '@/states/global/hooks'
import { toggleSidebar } from '@/states/global/settings'

interface ContainerProps {
  children: React.ReactNode
}

const Container = (props: ContainerProps) => {
  const { children } = props
  const isMobile = useIsMobile()
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const [collapsedSize, setCollapsedSize] = useState(isMobile ? '0px' : '60px')
  const dispatch = useAppDispatch()
  // 只有桌機版的收合模式為 float
  const [isFloat, setIsFloat] = useState(isMobile === false && sidebarIsExtend === false)

  useEnhancedEffect(() => {
    setCollapsedSize(isMobile ? '0px' : '60px')
  }, [isMobile])

  useEnhancedEffect(() => {
    setIsFloat(isMobile === false && sidebarIsExtend === false)
  }, [isMobile, sidebarIsExtend])

  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <SidebarContext.Provider value={{ isFloat }}>
      <div
        tw="absolute overflow-visible w-50 left-0 transition-width duration-300"
        css={[isFloat && tw`w-15`]}
      >
        <button
          className="flex-center"
          onClick={handleClick}
          tw="absolute left-full top-12 py-2 px-2.5 rounded-full text-g3 bg-white w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 shadow-md border border-solid border-g2 hover:(bg-p1 text-b0 border-p1)"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            tw="color[inherit] text-xs transition-transform duration-300"
            css={[isFloat && tw`transform rotate-180`]}
          />
        </button>
      </div>

      <Collapse
        inProps={sidebarIsExtend}
        orientation="horizontal"
        tw="bg-transparent"
        collapsedSize={collapsedSize}
      >
        {children}
      </Collapse>
    </SidebarContext.Provider>
  )
}

export default Container
