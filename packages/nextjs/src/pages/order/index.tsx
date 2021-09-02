import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Order = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">訂單管理</h1>
      </div>
    </main>
  )
}

Order.layout = DefaultLayout
Order.auth = true

export default Order
