import { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client'
import { Provider as ReduxProvider } from 'react-redux'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// states
import { store } from '@/states/global/store'

// styles
import '@/styles/globals.css'

// utils
import withAuth from '@/utils/withAuth'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

type MyAppProps = AppProps & {
  Component: {
    layout?: React.FunctionComponent
    auth?: boolean
  }
}

const DefaultLayout = (props: { children: React.ReactNode }) => <>{props.children}</>

function MyApp({ Component, pageProps }: MyAppProps) {
  const { layout: Layout = DefaultLayout, auth = false } = Component

  const ComponentWithLayout: React.FC = () => (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

  const ComponentWithAuth: React.FC = auth ? withAuth(ComponentWithLayout) : ComponentWithLayout

  return (
    <ReduxProvider store={store}>
      <AuthProvider session={pageProps.session}>
        <ComponentWithAuth />
      </AuthProvider>
    </ReduxProvider>
  )
}

export default MyApp
