import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Promotion = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">促銷管理</h1>
      </div>
    </main>
  )
}

Promotion.layout = DefaultLayout
Promotion.auth = true

export default Promotion
