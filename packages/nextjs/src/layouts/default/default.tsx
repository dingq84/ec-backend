import Head from 'next/head'
import 'twin.macro'

// components
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'
import PageTransition from '@/components/shared/pageTransition'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props: DefaultLayoutProps) => {
  const { children } = props

  return (
    <div tw="h-screen w-screen flex">
      <Head>
        <title>E-commerce backstage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Sidebar />
      <div tw="flex flex-col min-h-0 py-5 px-6 bg-blue-1 flex-grow">
        <Header />
        <PageTransition tw="flex-grow mt-5 overflow-hidden">
          <main tw="flex flex-col h-full">{children}</main>
        </PageTransition>
      </div>
    </div>
  )
}

export default DefaultLayout
