/**
 * @author Dean Chen 2021-04-10
 * 預設 layout，擁有 header、 aside 和 footer，main 根據不同 route 顯示不同畫面
 *
 * @modified
 * [Dean Chen 2021-05-07]: 替 page 新增 fade transition
 * [Dean Chen 2021-05-24]: 在 TransitionGroup 上加上 min-w-0，
 * 因為 main 繼承下來的寬度，假設是 500px，但當子層的 width 超過 500px
 * 會造成 main 跟著拉大，後來查到原因是因為 flex item 不能小於他的內容，因此將 min-width 改成 0，
 * 參考 https://stackoverflow.com/questions/41674979/flex-child-is-growing-out-of-parent
 * [Dean Chen 2021-06-08]: 將頁面動畫拉出去，為了不同 layout 之間共用
 */

import 'twin.macro'

// components
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'
import PageTransition from '@/components/shared/pageTransition'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props: DefaultLayoutProps) => {
  const { children } = props

  return (
    <div tw="h-screen flex flex-col">
      <Header />
      <div tw="flex flex-grow min-h-0">
        <Sidebar />
        <PageTransition tw="flex-grow min-w-0 bg-white-2">{children}</PageTransition>
      </div>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
