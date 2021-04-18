import 'twin.macro'

// components
import Collapse from '@/components/common/collapse'

// states
import { useAppSelector } from '@/states/global/hooks'

const Sidebar: React.FC<{}> = () => {
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)

  return (
    <Collapse inProps={sidebarIsExtend} orientation="horizontal" collapsedSize="50px">
      <aside tw="flex-shrink-0 bg-dark-blue-1 w-12 md:(w-60 min-height[calc(100vh - 3rem)])"></aside>
    </Collapse>
  )
}

export default Sidebar
