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
      <div tw="flex min-height[calc(100vh - 3rem)]">
        <Sidebar />
        <main tw="flex-shrink-0 flex-grow  bg-red-500">{children}</main>
      </div>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
