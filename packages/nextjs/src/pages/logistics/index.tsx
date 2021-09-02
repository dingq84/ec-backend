import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Logistics = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">物流管理</h1>
      </div>
    </main>
  )
}

Logistics.layout = DefaultLayout
Logistics.auth = true

export default Logistics
