import { useState, useRef, SyntheticEvent, useReducer } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { isRight } from 'fp-ts/Either'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import Paper from '@/components/shared/paper'
import TextField from '@/components/shared/textField'
import Toast from '@/components/shared/toast'

// core
import core from '@ec-backend/core/src'
import { StatusCode } from '@ec-backend/core/src/common/constants/statusCode'

// layouts
import LoginLayout from '@/layouts/login'

interface LoginData {
  account: string
  password: string
}

interface ErrorState {
  type: 'local' | 'global'
  message: string
  target: Array<keyof LoginData>
}

type Action =
  | { type: 'localError'; payload: { message: string; target: Array<keyof LoginData> } }
  | { type: 'globalError'; payload: { message: string } }
  | { type: 'reset' }

const initialValue: ErrorState = {
  type: 'local',
  message: '',
  target: []
}

const reducer = (state: ErrorState, action: Action): ErrorState => {
  switch (action.type) {
    case 'localError':
      return { ...action.payload, type: 'local' }
    case 'globalError':
      return { ...action.payload, type: 'global', target: ['account', 'password'] }
    case 'reset':
      return initialValue
    default:
      return state
  }
}

function Login() {
  const router = useRouter()
  const [inputType, setInputType] = useState<'text' | 'password'>('password')
  const [data, setData] = useState<LoginData>({ account: '', password: '' })
  const [errors, dispatch] = useReducer(reducer, initialValue)

  const accountRef = useRef<HTMLInputElement>(null!)
  const mutation = useMutation((data: LoginData) => core.auth.token.login(data))

  const handleInputTypeChange = (): void => {
    if (inputType === 'text') {
      setInputType('password')
    } else {
      setInputType('text')
    }
  }

  const resetError = (): void => {
    dispatch({ type: 'reset' })
  }

  const handleChange = (value: string, type: keyof LoginData): void => {
    setData(data => ({ ...data, [type]: value }))
    resetError()
  }

  const onSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const result = await mutation.mutateAsync(data)
    if (isRight(result)) {
      router.push('/')
      return
    }

    const { errorMessage, statusCode } = result.left

    // 清除密碼
    setData(data => ({ ...data, password: '' }))
    // 反白帳號
    accountRef.current.focus()
    accountRef.current.select()

    // 錯誤為帳號密碼的問題，視為局部錯誤，其餘為全局錯誤
    if (
      [
        StatusCode.emptyAccountOrPassword,
        StatusCode.wrongAccountFormat,
        StatusCode.wrongAccountOrPassword
      ].includes(statusCode)
    ) {
      const target: Array<keyof LoginData> = ['account']
      if (statusCode !== StatusCode.wrongAccountFormat) {
        target.push('password')
      }

      dispatch({ type: 'localError', payload: { message: errorMessage, target } })
    } else {
      dispatch({ type: 'globalError', payload: { message: errorMessage.replace(/,/g, ',\n') } })
    }
  }

  return (
    <LoginLayout>
      <Toast
        show={Boolean(errors.message && errors.type === 'local')}
        message={errors.message}
        level="warning"
        position="leftBottom"
      />

      <Dialog
        open={Boolean(errors.message && errors.type === 'global')}
        modalProps={{
          onClose: resetError
        }}
        content={
          <div tw="py-5 w-full">
            <h1 tw="font-medium text-black text-2xl mb-8 text-center">系統提醒</h1>
            <p tw="text-lg font-normal text-black text-center mb-10 whitespace-pre">
              {errors.message}
            </p>
          </div>
        }
        close={resetError}
      />

      <Paper tw="bg-white height[calc(100% - 64px)] px-12 width[450px] flex-col">
        <h1 tw="w-full text-black text-4xl font-semibold leading-normal mb-4">後台管理系統</h1>
        <p tw="text-lg text-gray-3 font-normal w-full">請登入您的使用者帳號及密碼</p>
        <form tw="w-full mt-12 flex flex-col" onSubmit={onSubmit}>
          <TextField
            inputRef={accountRef}
            id="account"
            name="account"
            label="帳號"
            placeholder="請輸入您的帳號"
            error={errors.target.includes('account')}
            onChange={value => handleChange(value, 'account')}
            tabIndex={1}
            value={data.account}
            tw="mb-4 w-full"
          />
          <TextField
            id="password"
            name="password"
            type={inputType}
            label="密碼"
            tabIndex={2}
            value={data.password}
            placeholder="請輸入您的密碼"
            error={errors.target.includes('password')}
            onChange={value => handleChange(value, 'password')}
            adornment={{
              end: (
                <FontAwesomeIcon
                  tw="cursor-pointer text-gray-3"
                  icon={inputType === 'text' ? faEyeSlash : faEye}
                  onClick={handleInputTypeChange}
                />
              )
            }}
          />
          <Button
            label="登入"
            tabIndex={3}
            className="btn"
            tw="mt-15 w-full font-medium text-lg"
            type="submit"
          />
        </form>
      </Paper>
    </LoginLayout>
  )
}

export default Login
