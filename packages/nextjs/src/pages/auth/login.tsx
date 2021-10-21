import { useState, useRef, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Loading from '@/components/shared/loading'
import Paper from '@/components/shared/paper'
import TextField from '@/components/shared/textField'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'
import { ILoginInputPort } from '@ec-backstage/core/src/auth/application/interface/iLoginUseCase'

// layouts
import LoginLayout from '@/layouts/login'

// services
import useNormalMutation from '@/services/useNormalMutation'

// states
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'
import { pushToast } from '@/states/toast'

function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [inputType, setInputType] = useState<'text' | 'password'>('password')
  const [loginData, setLoginData] = useState<ILoginInputPort>({ account: '', password: '' })
  const [errorFields, setErrorFields] = useState<Array<keyof ILoginInputPort>>([])
  const accountRef = useRef<HTMLInputElement>(null!)
  const { isLoading, mutate } = useNormalMutation(
    (data: ILoginInputPort) => core.auth.login(data),
    {
      onSuccess() {
        router.push('/')
      },
      onError(error) {
        const { errorMessage: message, statusCode, data } = error
        const errorData = data as Record<Partial<keyof ILoginInputPort>, 'string'> | []
        // 清除密碼
        setLoginData(oldLoginData => ({ ...oldLoginData, password: '' }))
        focusAccountField()
        // 後端回傳的 data 為空陣列
        if (Array.isArray(errorData)) {
          setErrorFields(['account', 'password'])

          // 帳號密碼錯誤跳 toast
          if (StatusCode.wrongAccountOrPassword === statusCode) {
            dispatch(pushToast({ show: true, message, level: 'warning' }))
          } else {
            dispatch(setError({ show: true, message, statusCode }))
          }
          return
        }

        setErrorFields(Object.keys(errorData) as Array<keyof typeof errorData>)
        dispatch(pushToast({ show: true, message, level: 'warning' }))
      }
    }
  )

  const focusAccountField = (): void => {
    // 反白帳號
    accountRef.current.focus()
    accountRef.current.select()
  }

  const handleInputTypeChange = (): void => {
    setInputType(inputType === 'text' ? 'password' : 'text')
  }

  const handleChange = (value: string, field: keyof ILoginInputPort): void => {
    if (errorFields.length) {
      setErrorFields([])
    }
    setLoginData(oldLoginData => ({ ...oldLoginData, [field]: value }))
  }

  const onSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()
    mutate(loginData)
  }

  return (
    <LoginLayout>
      <Paper tw="bg-white height[calc(100% - 64px)] px-12 width[450px] flex flex-col justify-center">
        <h1 tw="w-full text-black text-4xl font-semibold leading-normal mb-4">後台管理系統</h1>
        <p tw="text-lg text-gray-3 font-normal w-full">請登入您的使用者帳號及密碼</p>
        <form tw="w-full mt-12 flex flex-col" onSubmit={onSubmit}>
          <TextField
            inputRef={accountRef}
            id="account"
            name="account"
            label="帳號"
            placeholder="請輸入您的帳號"
            error={errorFields.includes('account')}
            onChange={value => handleChange(value, 'account')}
            onClear={() => handleChange('', 'account')}
            tabIndex={1}
            value={loginData.account}
            tw="mb-4 w-full"
          />
          <TextField
            id="password"
            name="password"
            type={inputType}
            label="密碼"
            tabIndex={2}
            value={loginData.password}
            placeholder="請輸入您的密碼"
            error={errorFields.includes('password')}
            onChange={value => handleChange(value, 'password')}
            onClear={() => handleChange('', 'password')}
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
      <Loading isLoading={isLoading} />
    </LoginLayout>
  )
}

export default Login
