import { SyntheticEvent, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import TextField from '@/components/shared/textField'

interface ModifyPasswordDialogProps {
  open: boolean
  close: () => void
}

interface InitialState {
  oldPassword: { type: 'text' | 'password'; value: string }
  newPassword1: { type: 'text' | 'password'; value: string }
  newPassword2: { type: 'text' | 'password'; value: string }
}

const initialState: InitialState = {
  oldPassword: { type: 'password', value: '' },
  newPassword1: { type: 'password', value: '' },
  newPassword2: { type: 'password', value: '' }
}

type Action =
  | { type: 'oldPassword'; payload: { type?: 'text' | 'password'; value?: string } }
  | { type: 'newPassword1'; payload: { type?: 'text' | 'password'; value?: string } }
  | { type: 'newPassword2'; payload: { type?: 'text' | 'password'; value?: string } }

const reducer = (state: InitialState, action: Action): InitialState => {
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

const ModifyPasswordDialog = (props: ModifyPasswordDialogProps) => {
  const { open, close } = props
  const [states, dispatch] = useReducer(reducer, initialState)

  const handleTypeChange = (target: keyof InitialState): void => {
    dispatch({
      type: target,
      payload: { type: states[target].type === 'text' ? 'password' : 'text' }
    })
  }

  const handleValueChange = (target: keyof InitialState, value: string): void => {
    dispatch({
      type: target,
      payload: { value }
    })
  }

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()
  }

  return (
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
            type={states.oldPassword.type}
            value={states.oldPassword.value}
            onChange={(value: string) => handleValueChange('oldPassword', value)}
            adornment={{
              end: (
                <FontAwesomeIcon
                  tw="cursor-pointer text-gray-3"
                  icon={states.oldPassword.type === 'text' ? faEyeSlash : faEye}
                  onClick={() => handleTypeChange('oldPassword')}
                />
              )
            }}
          />
          <TextField
            tw="mb-4"
            label="新密碼"
            hint="＊舊密碼和新密碼必須不一致"
            type={states.newPassword1.type}
            value={states.newPassword1.value}
            onChange={(value: string) => handleValueChange('newPassword1', value)}
            adornment={{
              end: (
                <FontAwesomeIcon
                  tw="cursor-pointer text-gray-3"
                  icon={states.newPassword1.type === 'text' ? faEyeSlash : faEye}
                  onClick={() => handleTypeChange('newPassword1')}
                />
              )
            }}
          />
          <TextField
            label="再次輸入新密碼"
            hint="＊新密碼與再次輸入新密碼檢核需一致"
            type={states.newPassword2.type}
            value={states.newPassword2.value}
            onChange={(value: string) => handleValueChange('newPassword2', value)}
            adornment={{
              end: (
                <FontAwesomeIcon
                  tw="cursor-pointer text-gray-3"
                  icon={states.newPassword2.type === 'text' ? faEyeSlash : faEye}
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
  )
}

export default ModifyPasswordDialog
