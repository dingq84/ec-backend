import { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
// import { QueryClient, QueryClientProvider } from 'react-query'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// components
import PageTransition from '@/components/shared/pageTransition'

// states
import { store } from '@/states/global/store'

// styles
import '@/styles/globals.css'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

// const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </ReduxProvider>
    // </QueryClientProvider>
  )
}

export default MyApp
