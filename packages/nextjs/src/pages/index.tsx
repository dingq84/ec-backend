import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Home = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">首頁</h1>
      </div>
    </main>
  )
}

Home.layout = DefaultLayout
Home.auth = true

export default Home
