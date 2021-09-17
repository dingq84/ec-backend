import { SyntheticEvent, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from 'react-query'
import { isRight } from 'fp-ts/lib/Either'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import TextField from '@/components/shared/textField'
import Toast, { ToastProps } from '@/components/shared/toast'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'

// states
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { setError } from '@/states/error'

// password initialState and reducer
interface PasswordInitialState {
  oldPassword: { type: 'text' | 'password'; value: string }
  newPassword1: { type: 'text' | 'password'; value: string }
  newPassword2: { type: 'text' | 'password'; value: string }
}

const passwordInitialState: PasswordInitialState = {
  oldPassword: { type: 'password', value: '' },
  newPassword1: { type: 'password', value: '' },
  newPassword2: { type: 'password', value: '' }
}

type PasswordAction =
  | { type: 'oldPassword'; payload: { type?: 'text' | 'password'; value?: string } }
  | { type: 'newPassword1'; payload: { type?: 'text' | 'password'; value?: string } }
  | { type: 'newPassword2'; payload: { type?: 'text' | 'password'; value?: string } }

const passwordReducer = (
  state: PasswordInitialState,
  action: PasswordAction
): PasswordInitialState => {
  switch (action.type) {
    case 'oldPassword':
      return {
        ...state,
        oldPassword: { ...state.oldPassword, ...action.payload }
      }
    case 'newPassword1':
      return {
        ...state,
        newPassword1: { ...state.newPassword1, ...action.payload }
      }
    case 'newPassword2':
      return {
        ...state,
        newPassword2: { ...state.newPassword2, ...action.payload }
      }
    default:
      return state
  }
}

// error initialState and reducer
interface ErrorStates extends Pick<ToastProps, 'level' | 'show' | 'message'> {
  target: Array<keyof PasswordInitialState>
}

const toastInitialStates: ErrorStates = {
  level: 'info',
  show: true,
  message: '密碼須為英文及數字的組合，長度為6~12碼。',
  target: []
}

type ErrorAction =
  | { type: 'close' }
  | { type: 'show'; payload: Pick<ErrorStates, 'level' | 'message' | 'target'> }

const errorReducer = (state: ErrorStates, action: ErrorAction): ErrorStates => {
  switch (action.type) {
    case 'close':
      return { ...state, show: false, target: [], message: '' }
    case 'show':
      return { ...state, ...action.payload, show: true }
    default:
      return state
  }
}
interface ModifyPasswordDialogProps {
  open: boolean
  close: () => void
  success: () => void
}

const ModifyPasswordDialog = (props: ModifyPasswordDialogProps) => {
  const { open, close, success } = props
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, passwordInitialState)
  const [errorStates, errorDispatch] = useReducer(errorReducer, toastInitialStates)
  const reduxDispatch = useAppDispatch()
  const accountId = useAppSelector(state => state.me.user.id)

  const mutation = useMutation(
    (data: Record<keyof PasswordInitialState, string> & { accountId: number }) =>
      core.admin.updatePassword(data)
  )
  const passwordKeys = Object.keys(passwordState) as Array<keyof typeof passwordState>

  const closeToast = (): void => {
    errorDispatch({
      type: 'close'
    })
  }

  const handleTypeChange = (target: keyof PasswordInitialState): void => {
    passwordDispatch({
      type: target,
      payload: { type: passwordState[target].type === 'text' ? 'password' : 'text' }
    })
  }

  const handleValueChange = (target: keyof PasswordInitialState, value: string): void => {
    if (errorStates.level === 'warning') {
      errorDispatch({ type: 'show', payload: toastInitialStates })
    }
    passwordDispatch({
      type: target,
      payload: { value }
    })
  }

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()
    const data = passwordKeys.reduce(
      (accumulate, current) => ({
        ...accumulate,
        [current]: passwordState[current].value
      }),
      {} as Record<keyof PasswordInitialState, string>
    )
    const result = await mutation.mutateAsync({ ...data, accountId })

    if (isRight(result)) {
      success()
      return
    }

    const { errorMessage, statusCode } = result.left
    switch (statusCode) {
      case StatusCode.wrongPasswordFormat:
      case StatusCode.emptyPassword:
        errorDispatch({
          type: 'show',
          payload: {
            message: errorMessage,
            level: 'warning',
            target: ['oldPassword', 'newPassword1', 'newPassword2']
          }
        })
        break
      case StatusCode.passwordIsNotSame:
        errorDispatch({
          type: 'show',
          payload: {
            message: errorMessage,
            level: 'warning',
            target: ['newPassword1', 'newPassword2']
          }
        })
        break
      case StatusCode.newPasswordIsSameAsOldPassword:
        errorDispatch({
          type: 'show',
          payload: {
            message: errorMessage,
            level: 'warning',
            target: ['oldPassword', 'newPassword1', 'newPassword2']
          }
        })
        break
      case StatusCode.wrongPassword:
        errorDispatch({
          type: 'show',
          payload: {
            message: errorMessage,
            level: 'warning',
            target: ['oldPassword']
          }
        })
        break
      default:
        reduxDispatch(setError({ message: errorMessage, show: true, statusCode }))
    }
  }

  return (
    <>
      <Dialog
        tw="pb-20"
        modalProps={{
          onClose: close
        }}
        open={open}
        content={
          <div tw="py-5 width[300px] mx-16">
            <h1 tw="font-medium text-black text-2xl mb-8 text-center">重設密碼</h1>
            <TextField
              tw="mb-4"
              label="舊密碼"
              type={passwordState.oldPassword.type}
              value={passwordState.oldPassword.value}
              onChange={(value: string) => handleValueChange('oldPassword', value)}
              error={errorStates.target.includes('oldPassword')}
              adornment={{
                end: (
                  <FontAwesomeIcon
                    tw="cursor-pointer text-gray-3"
                    icon={passwordState.oldPassword.type === 'text' ? faEyeSlash : faEye}
                    onClick={() => handleTypeChange('oldPassword')}
                  />
                )
              }}
            />
            <TextField
              tw="mb-4"
              label="新密碼"
              hint="＊舊密碼和新密碼必須不一致"
              type={passwordState.newPassword1.type}
              value={passwordState.newPassword1.value}
              onChange={(value: string) => handleValueChange('newPassword1', value)}
              error={errorStates.target.includes('newPassword1')}
              adornment={{
                end: (
                  <FontAwesomeIcon
                    tw="cursor-pointer text-gray-3"
                    icon={passwordState.newPassword1.type === 'text' ? faEyeSlash : faEye}
                    onClick={() => handleTypeChange('newPassword1')}
                  />
                )
              }}
            />
            <TextField
              label="再次輸入新密碼"
              hint="＊新密碼與再次輸入新密碼檢核需一致"
              type={passwordState.newPassword2.type}
              value={passwordState.newPassword2.value}
              onChange={(value: string) => handleValueChange('newPassword2', value)}
              error={errorStates.target.includes('newPassword2')}
              adornment={{
                end: (
                  <FontAwesomeIcon
                    tw="cursor-pointer text-gray-3"
                    icon={passwordState.newPassword2.type === 'text' ? faEyeSlash : faEye}
                    onClick={() => handleTypeChange('newPassword2')}
                  />
                )
              }}
            />
          </div>
        }
        Footer={
          <div className="flex-center">
            <Button label="取消" className="btn-outline" onClick={close} />
            <Button label="重設密碼" className="btn" tw="ml-10" onClick={handleSubmit} />
          </div>
        }
        close={close}
      />

      <Toast {...errorStates} autoClose={false} close={closeToast} />
    </>
  )
}

export default ModifyPasswordDialog
