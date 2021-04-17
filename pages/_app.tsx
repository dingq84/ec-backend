import { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client'
import { Provider as ReduxProvider } from 'react-redux'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// states
import { store } from '@/states/global/store'

// styles
import '@/styles/globals.css'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <AuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </AuthProvider>
    </ReduxProvider>
  )
}

export default MyApp
