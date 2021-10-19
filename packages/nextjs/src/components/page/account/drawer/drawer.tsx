// components
import CreateDrawer from '@/components/page/account/drawer/createDrawer'
import EditViewDrawer from '@/components/page/account/drawer/editViewDrawer'

// pages
import { Mode } from '@/pages/account'

type AccountDrawerProps = {
  open: boolean
  close(): void
  mode: Mode
  id?: number
  changeModeToEdit(): void
}

const AccountDrawer = (props: AccountDrawerProps) => {
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

export default AccountDrawer
