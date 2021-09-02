import 'twin.macro'

// layouts
import DefaultLayout from '@/layouts/default'

const Account = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">會員管理</h1>
      </div>
    </main>
  )
}

Account.layout = DefaultLayout
Account.auth = true

export default Account
