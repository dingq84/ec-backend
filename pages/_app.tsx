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

// TODO: 如果把 Layout 放進去 withAuth 裡面，會造成相同 layout 的 state 重置（相同 layout）
// 如果把 Layout 放在 auth 之外，就會變成先看到 layout 才會出現是否認證的畫面，
// 需要想個方法折衷
function MyApp({ Component, pageProps }: MyAppProps) {
  const { layout: Layout = DefaultLayout, auth = false } = Component

  const ComponentWithAuth = auth ? withAuth(Component) : Component

  return (
    <ReduxProvider store={store}>
      <AuthProvider session={pageProps.session}>
        <Layout>
          <ComponentWithAuth {...pageProps} />
        </Layout>
      </AuthProvider>
    </ReduxProvider>
  )
}

export default MyApp
