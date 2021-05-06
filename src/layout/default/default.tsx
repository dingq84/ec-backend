/**
 * @author Dean Chen 2021-04-10
 * 替專案提供一個基本的 layout，擁有 header、 aside 和 footer，main 根據不同 route 顯示不同畫面
 */

import 'twin.macro'

// components
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

type DefaultLayoutProps = {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props: DefaultLayoutProps) => {
  const { children } = props

  return (
    <div tw="min-h-full">
      <Header />
      <div tw="w-full flex">
        <Sidebar />
        <main tw="flex-grow bg-light-gray-1 min-height[calc(100vh - 6rem)] md:min-height[calc(100vh - 3rem)]">
          {children}
        </main>
      </div>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
