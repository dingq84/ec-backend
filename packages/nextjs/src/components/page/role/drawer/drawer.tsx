// components
import Drawer from '@/components/shared/drawer'

// pages
import { Mode } from '@/pages/role'

interface RoleDrawerProps {
  mode: Mode
  open: boolean
}

const RoleDrawer = (props: RoleDrawerProps) => {
  const { open } = props
  return (
    <Drawer open={open} position="right">
      <div>刪除角色</div>
    </Drawer>
  )
}

export default RoleDrawer
