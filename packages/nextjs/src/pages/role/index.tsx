import 'twin.macro'

// components
import Button from '@/components/shared/button'

// layouts
import DefaultLayout from '@/layouts/default'

const Role = () => {
  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">角色權限管理</h1>
        <Button className="btn" label="創建角色" />
      </div>
    </main>
  )
}

Role.layout = DefaultLayout
Role.auth = true

export default Role
