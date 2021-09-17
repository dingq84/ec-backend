import { useState, useRef, SyntheticEvent } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { isRight } from 'fp-ts/Either'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import TextField from '@/components/shared/textField'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'
import { ILoginInputPort } from '@ec-backstage/core/src/auth/application/interface/iLoginUseCase'

// layouts
import LoginLayout from '@/layouts/login'

// states
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'
import { pushToast } from '@/states/toast'

function Login() {
  const router = useRouter()
  const [inputType, setInputType] = useState<'text' | 'password'>('password')
  const [data, setData] = useState<ILoginInputPort>({ account: '', password: '' })
  const [errorFields, setErrorFields] = useState<Array<keyof ILoginInputPort>>([])
  const dispatch = useAppDispatch()
  const accountRef = useRef<HTMLInputElement>(null!)
  const mutation = useMutation((data: ILoginInputPort) => core.auth.login(data))

  const handleInputTypeChange = (): void => {
    if (inputType === 'text') {
      setInputType('password')
    } else {
      setInputType('text')
    }
  }

  const handleChange = (value: string, type: keyof ILoginInputPort): void => {
    if (errorFields.length) {
      setErrorFields([])
    }
    setData(data => ({ ...data, [type]: value }))
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
    if (
      [
        StatusCode.emptyAccountOrPassword,
        StatusCode.wrongAccountFormat,
        StatusCode.wrongAccountOrPassword
      ].includes(statusCode) === false
    ) {
      dispatch(setError({ message: errorMessage, show: true, statusCode }))
      return
    }

    if (statusCode !== StatusCode.wrongAccountFormat) {
      setErrorFields(['account', 'password'])
    } else {
      setErrorFields(['account'])
    }

    dispatch(pushToast({ show: true, message: errorMessage, level: 'warning' }))
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
            error={errorFields.includes('password')}
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
