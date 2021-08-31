import 'twin.macro'

// context
import useTabContext from '@/components/shared/tab/useTabContext'

interface TabPanelProps {
  children: React.ReactNode
  index?: number // 從 tabs 來，設置 optional，防止外部使用時，ts 跳警告
}

const TabPanel = (props: TabPanelProps) => {
  const { index, children } = props
  const { activeIndex } = useTabContext()

  return activeIndex === index ? (
    <div tw="pt-5" className="scroll-y">
      {children}
    </div>
  ) : null
}

export default TabPanel
