import 'twin.macro'

// components
import Dialog from '@/components/shared/dialog'

// states
import { useAppDispatch, useAppSelector } from '@/states/global/hooks'
import { reset } from '@/states/global/error'

const ErrorDialog = () => {
  const message = useAppSelector(state => state.error.message).replace(/,/g, ',\n')
  const callback = useAppSelector(state => state.error.callback)
  const dispatch = useAppDispatch()

  const close = (): void => {
    dispatch(reset())

    if (callback) {
      callback()
    }
  }

  return (
    <Dialog
      open={Boolean(message)}
      modalProps={{
        onClose: close
      }}
      content={
        <div tw="py-5 w-full">
          <h1 tw="font-medium text-black text-2xl mb-8 text-center">系統提醒</h1>
          <p tw="text-lg font-normal text-black text-center mb-10 whitespace-pre">{message}</p>
        </div>
      }
      close={close}
    />
  )
}

export default ErrorDialog
