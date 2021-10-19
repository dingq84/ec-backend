import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Commodity = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">商品管理</h1>
      </div>
    </main>
  )
}

Commodity.layout = DefaultLayout
Commodity.auth = true

export default Commodity
