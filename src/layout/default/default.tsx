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
 */

import { TransitionGroup } from 'react-transition-group'
import { useRouter } from 'next/router'
import 'twin.macro'

// components
import Fade from '@/components/common/fade'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props: DefaultLayoutProps) => {
  const router = useRouter()
  const { children } = props

  return (
    <div tw="h-screen flex flex-col">
      <Header />
      <div tw="flex flex-grow min-h-0">
        <Sidebar />
        <TransitionGroup tw="flex-grow min-w-0 bg-light-gray-1">
          <Fade inProps key={router.pathname} appear={false} timeout={300}>
            <main tw="h-full">{children}</main>
          </Fade>
        </TransitionGroup>
      </div>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
