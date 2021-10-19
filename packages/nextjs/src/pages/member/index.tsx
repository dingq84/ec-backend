import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Member = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">會員管理</h1>
      </div>
    </main>
  )
}

Member.layout = DefaultLayout
Member.auth = true

export default Member
