import React, { Fragment } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// components
import ErrorDialog from '@/components/page/common/errorDialog'

// states
import { store } from '@/states/global/store'

// styles
import '@/styles/globals.css'

// utils
import withAuth from '@/utils/shared/withAuth'

const queryClient = new QueryClient()
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

type MyAppProps = AppProps & {
  Component: {
    layout?: ({ children }: { children: React.ReactNode }) => JSX.Element
    auth?: boolean
  }
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.layout || Fragment
  const ProtectedComponent = Component.auth ? withAuth(Component) : Component

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <ProtectedComponent {...pageProps} />
        </Layout>
        <ErrorDialog />
      </ReduxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
