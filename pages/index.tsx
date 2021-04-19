import 'twin.macro'

// layouts
import DefaultLayout from '@/layout/default'

// types
import { MyPage } from '@/types/next'

const Home: MyPage = () => {
  return <div>hi</div>
}

Home.layout = DefaultLayout
Home.auth = true

export default Home
