import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Store = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">門市管理</h1>
      </div>
    </main>
  )
}

Store.layout = DefaultLayout
Store.auth = true

export default Store
