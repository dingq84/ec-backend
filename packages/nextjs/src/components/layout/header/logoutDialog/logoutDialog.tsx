import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { isRight } from 'fp-ts/lib/Either'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'

// core
import core from '@ec-backend/core/src'

// states
import { useAppDispatch } from '@/states/global/hooks'
import { setMessage } from '@/states/global/error'
import { clearMe } from '@/states/global/me'

interface LogoutDialogProps {
  open: boolean
  close: () => void
}
const LogoutDialog = (props: LogoutDialogProps) => {
  const { open, close } = props
  const router = useRouter()
  const dispatch = useAppDispatch()
  const mutation = useMutation(() => core.auth.token.logout())

  const logout = async (): Promise<void> => {
    const result = await mutation.mutateAsync()
    close()

    if (isRight(result)) {
      dispatch(clearMe())
      router.push('/auth/login')
      return
    }

    const { errorMessage } = result.left
    const message = errorMessage.replace(/,/g, ',\n')
    dispatch(setMessage({ message }))
  }

  return (
    <Dialog
      modalProps={{
        onClose: close
      }}
      open={open}
      content={
        <div tw="py-5 w-full">
          <h1 tw="font-medium text-black text-2xl mb-8 text-center">系統提醒</h1>
          <p tw="text-lg font-normal text-black text-center mb-10 whitespace-pre">
            您將從此帳號登出。
          </p>
        </div>
      }
      Footer={
        <div className="flex-center">
          <Button label="取消" className="btn-outline" onClick={close} />
          <Button label="確認" className="btn" tw="ml-10" onClick={logout} />
        </div>
      }
      close={close}
    />
  )
}

export default LogoutDialog
