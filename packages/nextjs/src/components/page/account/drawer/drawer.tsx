// components
import CreateDrawer from '@/components/page/account/drawer/createDrawer'
import EditViewDrawer from '@/components/page/account/drawer/editViewDrawer'

// constants
import { OperationMode } from '@/constants/common'

type AccountDrawerProps = {
  open: boolean
  close(): void
  mode: OperationMode
  id?: number
  changeModeToEdit(): void
}

const AccountDrawer = (props: AccountDrawerProps) => {
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

export default AccountDrawer
