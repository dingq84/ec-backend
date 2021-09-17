// components
import CreateDrawer from '@/components/page/role/drawer/createDrawer'
import EditViewDrawer from '@/components/page/role/drawer/editViewDrawer'

// pages
import { Mode } from '@/pages/role'

type RoleDrawerProps = {
  open: boolean
  close(): void
  mode: Mode
  id?: number
  changeModeToEdit(): void
}

const RoleDrawer = (props: RoleDrawerProps) => {
  const { mode, open, changeModeToEdit, ...restProps } = props

  return mode === 'create' ? (
    <CreateDrawer open={open} {...restProps} />
  ) : (
    <EditViewDrawer
      open={open}
      id={props.id!}
      mode={mode}
      changeModeToEdit={changeModeToEdit}
      {...restProps}
    />
  )
}

export default RoleDrawer
