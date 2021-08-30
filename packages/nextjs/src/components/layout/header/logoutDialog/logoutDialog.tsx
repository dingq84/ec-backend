import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
interface LogoutDialogProps {
  open: boolean
  close: () => void
  logout: () => Promise<void>
}
const LogoutDialog = (props: LogoutDialogProps) => {
  const { open, close, logout } = props

  const handleClick = (): void => {
    close()
    logout()
  }

  return (
    <Dialog
      modalProps={{
        onClose: close
      }}
      open={open}
      content={
        <div tw="py-5 w-full">
          <h1 tw="font-medium text-black text-2xl mb-12 text-center">系統提醒</h1>
          <p tw="text-lg font-normal text-black text-center mb-12 whitespace-pre">
            您將從此帳號登出。
          </p>
        </div>
      }
      Footer={
        <div className="flex-center">
          <Button label="取消" className="btn-outline" onClick={close} />
          <Button label="確認" className="btn" tw="ml-10" onClick={handleClick} />
        </div>
      }
      close={close}
    />
  )
}

export default LogoutDialog
