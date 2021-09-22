import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import 'twin.macro'

// components
import Dialog from '@/components/shared/dialog'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'

// states
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { hideError } from '@/states/error'

const ErrorDialog = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { message, callback, show, statusCode } = useAppSelector(state => state.error)
  const close = (): void => {
    dispatch(hideError())
    if (
      [StatusCode.tokenCancel, StatusCode.tokenExpire, StatusCode.accountFrozen].includes(
        statusCode
      )
    ) {
      queryClient.removeQueries(ApiKey.isLogged)
      queryClient.removeQueries(ApiKey.me)
      core.auth.removeRefreshToken()
      router.push('/auth/login')
    }

    if (callback) {
      callback()
    }
  }

  return (
    <Dialog
      open={show}
      modalProps={{
        onClose: close
      }}
      content={
        <div tw="py-5 w-full">
          <h1 tw="font-medium text-black text-2xl mb-12 text-center">系統提醒</h1>
          <p tw="text-lg font-normal text-black text-center mb-12 whitespace-pre">{message}</p>
        </div>
      }
      close={close}
    />
  )
}

export default ErrorDialog
