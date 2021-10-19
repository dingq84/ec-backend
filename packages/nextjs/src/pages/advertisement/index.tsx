import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Advertisement = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">廣告管理</h1>
      </div>
    </main>
  )
}

Advertisement.layout = DefaultLayout
Advertisement.auth = true

export default Advertisement
