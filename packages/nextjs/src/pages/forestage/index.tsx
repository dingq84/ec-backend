import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Forestage = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">前台首頁管理</h1>
      </div>
    </main>
  )
}

Forestage.layout = DefaultLayout
Forestage.auth = true

export default Forestage
