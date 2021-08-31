import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'

// context
import useTabContext from '@/components/shared/tab/useTabContext'

interface TabProps {
  click?: (index: number) => void
  children: React.ReactNode
  index?: number // 從 tabs 來，設置 optional，防止外部使用時，ts 跳警告
}

const Tab = (props: TabProps) => {
  const { children, click, index } = props
  const { activeIndex, updateActiveIndex } = useTabContext()

  const handleClick = () => {
    updateActiveIndex(index!)
    if (click) {
      click(index!)
    }
  }

  return (
    <Button
      label={children}
      onClick={handleClick}
      className="btn-text"
      tw="px-8 py-5 text-sm text-gray-3 font-medium"
      css={[
        activeIndex === index && tw`text-primary border-b-2 border-solid border-primary -mb-0.5`
      ]}
    />
  )
}

export default Tab
