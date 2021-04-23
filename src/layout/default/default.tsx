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
        <main tw="flex-grow  bg-red-500 min-height[calc(100vh - 6rem)] md:min-height[calc(100vh - 3rem)]">
          {children}
        </main>
      </div>
      <footer></footer>
    </div>
  )
}

export default DefaultLayout
