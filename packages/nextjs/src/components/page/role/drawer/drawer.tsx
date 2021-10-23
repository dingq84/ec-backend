// components
import CreateDrawer from '@/components/page/role/drawer/createDrawer'
import EditViewDrawer from '@/components/page/role/drawer/editViewDrawer'

// constants
import { OperationMode } from '@/constants/common'

interface RoleDrawerProps {
  open: boolean
  close(): void
  mode: OperationMode
  id?: number
  changeModeToEdit(): void
}

const RoleDrawer = (props: RoleDrawerProps) => {
  const { mode, open, changeModeToEdit, ...restProps } = props

  return mode === OperationMode.create ? (
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
