/**
 * @author Dean Chen 2021-04-10
 * 預設 layout，擁有 header、 aside 和 footer，main 根據不同 route 顯示不同畫面
 *
 * @modified
 * [Dean Chen 2021-05-07]: 替 page 新增 fade transition
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
    <div tw="min-h-full">
      <Header />
      <div tw="w-full flex">
        <Sidebar />
        <TransitionGroup tw="flex-grow bg-light-gray-1 min-height[calc(100vh - 6rem)] md:min-height[calc(100vh - 3rem)]">
          <Fade inProps key={router.pathname} appear={false} timeout={300}>
            <main tw="w-full h-full">{children}</main>
          </Fade>
        </TransitionGroup>
      </div>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
